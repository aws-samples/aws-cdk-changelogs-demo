

const cdk = require('@aws-cdk/core');
const ecs = require('@aws-cdk/aws-ecs');
const ecsPatterns = require('@aws-cdk/aws-ecs-patterns');
const ec2 = require('@aws-cdk/aws-ec2');
const dynamodb = require('@aws-cdk/aws-dynamodb');
const sns = require('@aws-cdk/aws-sns');
const s3 = require('@aws-cdk/aws-s3');
const s3Deployment = require('@aws-cdk/aws-s3-deployment');
const lambda = require('@aws-cdk/aws-lambda');
const lambdaEvents = require('@aws-cdk/aws-lambda-event-sources');
const apiGateway = require('@aws-cdk/aws-apigateway');
const events = require('@aws-cdk/aws-events');
const eventTargets = require('@aws-cdk/aws-events-targets');
const cloudfront = require('@aws-cdk/aws-cloudfront');
const redis = require('./custom-constructs/redis');
const copydir = require('copy-dir');
var fs = require('fs');

var settings = undefined;

if (fs.existsSync('./settings.json')) {
  settings = require('./settings.json');
}

var githubSecrets = {
  token: 'personal access token'
};

if (fs.existsSync('./secrets/github-access-token.json')) {
  githubSecrets = require('./secrets/github-access-token.json');
}

// A stack that holds all the shared resources, like the tables, etc.
class SharedResources extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Network to run everything in
    this.vpc = new ec2.Vpc(this, 'NpmFollowerVpc', {
      maxAZs: 2,
      natGateways: 1
    });

    // A table to store the list of changelogs and their metadata in
    this.changelogsTable = new dynamodb.Table(this, 'Changelogs', {
      partitionKey: { name: 'changelog', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PayPerRequest
    });

    // A table to store the list of feeds
    this.feedsTable = new dynamodb.Table(this, 'Feeds', {
      partitionKey: { name: 'feed', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PayPerRequest
    });

    // A table which stores the auto complete search index
    this.searchIndexTable = new dynamodb.Table(this, 'search-index', {
      partitionKey: { name: 'fragment', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'score', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'validUntil',
      billingMode: dynamodb.BillingMode.PayPerRequest
    });

    // An S3 bucket which holds the web content
    this.webBucket = new s3.Bucket(this, 'web-bucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html'
    });

    // An S3 bucket which holds the API content
    this.apiBucket = new s3.Bucket(this, 'api-bucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.json'
    });

    // An S3 bucket which holds the static content
    this.staticBucket = new s3.Bucket(this, 'static-bucket', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html'
    });

    // Create an ECS cluster
    this.cluster = new ecs.Cluster(this, 'Cluster', { vpc: this.vpc });

    // An SNS topic to which we can publish to trigger the crawl of a changelog
    this.toCrawlTopic = new sns.Topic(this, 'to-crawl', {
      displayName: 'Changelog to crawl'
    });

    this.redis = new redis.Cluster(this, 'redis', { vpc: this.vpc });
  }
}

// Lambda function that crawls a specific changelog
class Crawler extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Create a lambda that does the crawl
    const crawlLambda = new lambda.Function(this, 'crawl-lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'crawl.handle',
      code: lambda.Code.asset('./app/crawl'),
      timeout: cdk.Duration.seconds(30),
      vpc: props.vpc,
      environment: {
        GITHUB_AUTH_TOKEN: githubSecrets.authToken,
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        FEEDS_TABLE_NAME: props.feedsTable.tableName,
        SEARCH_INDEX_TABLE_NAME: props.searchIndexTable.tableName,
        API_BUCKET_NAME: props.apiBucket.bucketName,
        WEB_BUCKET_NAME: props.webBucket.bucketName,
        REDIS_HOST: props.redis.cluster.attrRedisEndpointAddress,
        REDIS_PORT: props.redis.cluster.attrRedisEndpointPort
      }
    });

    // Attach the lambda to the SNS topic so that when the follower
    // publishes to the SNS topic the Lambda gets invoked.
    const crawlEventSource = new lambdaEvents.SnsEventSource(props.toCrawlTopic);
    crawlLambda.addEventSource(crawlEventSource);

    // Grant the lambda permission to modify the tables
    props.changelogsTable.grantReadWriteData(crawlLambda.role);
    props.feedsTable.grantReadWriteData(crawlLambda.role);
    props.searchIndexTable.grantReadWriteData(crawlLambda.role);

    // Grant the lambda permission to write to the buckets
    props.webBucket.grantReadWrite(crawlLambda.role);
    props.apiBucket.grantReadWrite(crawlLambda.role);

    // Grant the lambda networking access to Redis
    crawlLambda.connections.allowToDefaultPort(props.redis);
  }
}

// Lambda that periodically triggers a recrawl of previously crawled
// changelogs.
class Recrawler extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Create a lambda that recrawls changelogs discovered in the past
    const recrawlLambda = new lambda.Function(this, 'recrawl', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'recrawl.handle',
      code: lambda.Code.asset('./app/recrawl'),
      timeout: cdk.Duration.minutes(5),
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        DISCOVERED_TOPIC_NAME: props.toCrawlTopic.topicArn
      }
    });

    // Grant the lambda permission to modify the tables
    props.changelogsTable.grantReadWriteData(recrawlLambda.role);
    props.toCrawlTopic.grantPublish(recrawlLambda.role);

    // Schedule the recrawler to run once every minute
    this.eventRule = new events.Rule(this, 'recrawl-check-schedule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
      targets: [new eventTargets.LambdaFunction(recrawlLambda)]
    });
  }
}

// A stack for the the follower app. This is a persistent container
// that acts as a CouchDB follower to monitor NPM's public CouchDB
// interface and get realtime notifications of modified NPM packages
class NpmFollower extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Prior to building the image copy the package.json and libs into
    // the build context since Docker can't reference files outside of the
    // build context.
    copydir.sync('./app/lib', './app/npm-follower/lib');
    copydir.sync('./app', './app/npm-follower', function (stat, filepath, filename) {
      if (stat === 'file' && filename === 'package.json') {
        return true;
      }

      return false;
    });

    // Define the follower application.
    const followerDefinition = new ecs.FargateTaskDefinition(this, 'NpmFollowerDefinition', {});

    followerDefinition.addContainer('npm-follower', {
      image: ecs.ContainerImage.fromAsset('./app/npm-follower'),
      memoryMiB: 512,
      cpu: 256,
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        DISCOVERED_TOPIC_NAME: props.toCrawlTopic.topicArn
      },
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'npm-follower'
      })
    });

    // Grant this application access to the DynamoDB table and SNS topic
    props.changelogsTable.grantReadWriteData(followerDefinition.taskRole);
    props.toCrawlTopic.grantPublish(followerDefinition.taskRole);

    // Launch the image as a service in Fargate
    this.npmFollower = new ecs.FargateService(this, 'NpmFollower', {
      assignPublicIp: true,
      cluster: props.cluster,
      cpu: '256',
      memoryMiB: '512',
      desiredCount: 1,
      taskDefinition: followerDefinition,
      createLogs: false
    });
  }
}

// A stack for the PyPI watcher. This is a lambda that runs on a schedule
// and triggers a crawl on the repo of any recently released PyPI python
// package
class PyPIFollower extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Create the lambda
    const pypiFollower = new lambda.Function(this, 'pypi-follower', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'pypi-recent.handle',
      code: lambda.Code.asset('./app/pypi-recent'),
      timeout: cdk.Duration.minutes(1),
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        DISCOVERED_TOPIC_NAME: props.toCrawlTopic.topicArn
      }
    });

    // Grant this application access to the DynamoDB table and SNS topic
    props.changelogsTable.grantReadWriteData(pypiFollower.role);
    props.toCrawlTopic.grantPublish(pypiFollower.role);

    // Schedule the follower to run once every 5 mins
    this.eventRule = new events.Rule(this, 'check-recent-pypi', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
      targets: [new eventTargets.LambdaFunction(pypiFollower)]
    });
  }
}

// A stack for the RubyGems watcher. This is a lambda that runs on a schedule
// and triggers a crawl on the repo of any recently released Ruby Gem
class RubyGemFollower extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Create the lambda
    const rubygemFollower = new lambda.Function(this, 'rubygem-follower', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'rubygem-recent.handle',
      code: lambda.Code.asset('./app/rubygem-recent'),
      timeout: cdk.Duration.minutes(1),
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        DISCOVERED_TOPIC_NAME: props.toCrawlTopic.topicArn
      }
    });

    // Grant this application access to the DynamoDB table and SNS topic
    props.changelogsTable.grantReadWriteData(rubygemFollower.role);
    props.toCrawlTopic.grantPublish(rubygemFollower.role);

    // Schedule the follower to run once every 5 mins
    this.eventRule = new events.Rule(this, 'check-recent-rubygems', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(5)),
      targets: [new eventTargets.LambdaFunction(rubygemFollower)]
    });
  }
}

class BroadcastSocket extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    const broadcast = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Broadcast', {
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('./app/socket-broadcast'),
        environment: {
          REDIS_HOST: props.redis.cluster.attrRedisEndpointAddress,
          REDIS_PORT: props.redis.cluster.attrRedisEndpointPort
        },
        enableLogging: true
      },
      assignPublicIp: true,
      cluster: props.cluster,
      cpu: '256',
      memoryMiB: '512',
      desiredCount: 1
    });

    // Grant the broadcast service networking access to Redis
    broadcast.service.connections.allowToDefaultPort(props.redis);

    this.dnsName = broadcast.loadBalancer.loadBalancerDnsName;
  }
}

// Lambda that periodically refreshes the API response that lists the recently
// crawled repositories
class RecentlyCrawled extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Create a lambda that returns autocomplete results
    const recentlyCrawled = new lambda.Function(this, 'recently-crawled', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'recently-crawled.handle',
      code: lambda.Code.asset('./app/recently-crawled'),
      environment: {
        FEEDS_TABLE_NAME: props.feedsTable.tableName,
        API_BUCKET_NAME: props.apiBucket.bucketName
      }
    });

    // Grant the lambda permission to modify the tables and S3 bucket
    props.feedsTable.grantReadWriteData(recentlyCrawled.role);
    props.apiBucket.grantReadWrite(recentlyCrawled.role);

    // Schedule the recrawler to run once every minute
    this.eventRule = new events.Rule(this, 'recrawl-check-schedule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
      targets: [new eventTargets.LambdaFunction(recentlyCrawled)]
    });
  }
}

class Autocompleter extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Create a lambda that returns autocomplete results
    const autocomplete = new lambda.Function(this, 'autocomplete', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'autocomplete.handle',
      code: lambda.Code.asset('./app/autocomplete'),
      environment: {
        SEARCH_INDEX_TABLE_NAME: props.searchIndexTable.tableName
      }
    });

    // Grant the lambda permission to modify the tables
    props.searchIndexTable.grantReadWriteData(autocomplete.role);

    this.autocompleteGateway = new apiGateway.LambdaRestApi(this, 'autocomplete-gateway', {
      handler: autocomplete,
      proxy: true
    });

    this.url = this.autocompleteGateway.url;
  }
}

class WebFrontend extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    // Copy the static files into the static S3 bucket
    this.s3Deployment = new s3Deployment.BucketDeployment(this, 'deploy-web', {
      sources: [
        s3Deployment.Source.asset('./static'),
      ],
      destinationBucket: props.staticBucket,
    });

    // Create a lambda that regenerates the homepage
    const regenerateHomepage = new lambda.Function(this, 'regenerate-homepage', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'regenerate-homepage.handle',
      code: lambda.Code.asset('./app/regenerate-homepage'),
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        FEEDS_TABLE_NAME: props.feedsTable.tableName,
        WEB_BUCKET_NAME: props.webBucket.bucketName
      }
    });

    // Grant the lambda permission to read the tables
    props.feedsTable.grantReadData(regenerateHomepage.role);
    props.changelogsTable.grantReadData(regenerateHomepage.role);
    props.webBucket.grantReadWrite(regenerateHomepage.role);

    // Schedule this lambda to run once a minute
    this.eventRule = new events.Rule(this, 'homepage-regeneration-schedule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(1)),
      targets: [new eventTargets.LambdaFunction(regenerateHomepage)]
    });
  }
}

class GlobalDistribution extends cdk.Stack {
  constructor(parent, id, props) {
    super(parent, id, props);

    this.dist = new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
      aliasConfiguration: settings.domain,
      originConfigs: [
        // All the static files, like CSS, JS, images, etc
        {
          customOriginSource: {
            domainName: props.staticBucket.bucketName + '.s3-website.' + this.region + '.amazonaws.com',
            originProtocolPolicy: 'http-only'
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true
            }
          ]
        },
        // The automatically generated HTML files
        {
          customOriginSource: {
            domainName: props.webBucket.bucketName + '.s3-website.' + this.region + '.amazonaws.com',
            originProtocolPolicy: 'http-only'
          },
          behaviors: [
            {
              pathPattern: 'github*',
              compress: true
            },
            {
              pathPattern: 'index.html',
              compress: true
            }
          ]
        },
        // The automatically generated JSON files
        {
          customOriginSource: {
            domainName: props.apiBucket.bucketName + '.s3-website.' + this.region + '.amazonaws.com',
            originProtocolPolicy: 'http-only'
          },
          behaviors: [
            {
              pathPattern: 'api*',
              compress: true
            }
          ]
        },
        // The autocomplete endpoints behind API gateway
        {
          customOriginSource: {
            domainName: props.autocompleteGateway.restApiId + '.execute-api.' + this.region + '.amazonaws.com',
          },
          originPath: '/prod',
          behaviors: [
            {
              pathPattern: 'search*',
              compress: true,
              forwardedValues: { queryString: true, cookies: { forward: 'none' } }
            }
          ]
        },
        // The websocket service which provides live updates to
        // the front facing website
        {
          customOriginSource: {
            domainName: props.broadcast.dnsName,
            originProtocolPolicy: 'http-only'
          },
          behaviors: [
            {
              pathPattern: 'socket.io*',
              forwardedValues: { queryString: true, cookies: { forward: 'all' } }
            }
          ]
        }
      ]
    });
  }
}

class NpmFollowerApp extends cdk.App {
  constructor(argv) {
    super(argv);

    // The stack that holds the shared underlying resources.
    const sharedResources = new SharedResources(this, 'prod-shared-resources');

    // The micro components that make up the application
    this.crawler = new Crawler(this, 'prod-crawler', {
      vpc: sharedResources.vpc,
      redis: sharedResources.redis,
      changelogsTable: sharedResources.changelogsTable,
      feedsTable: sharedResources.feedsTable,
      searchIndexTable: sharedResources.searchIndexTable,
      webBucket: sharedResources.webBucket,
      apiBucket: sharedResources.apiBucket,
      toCrawlTopic: sharedResources.toCrawlTopic
    });

    this.recrawler = new Recrawler(this, 'prod-recrawler', {
      changelogsTable: sharedResources.changelogsTable,
      toCrawlTopic: sharedResources.toCrawlTopic
    });

    this.recentlyCrawled = new RecentlyCrawled(this, 'prod-recently-crawled', {
      feedsTable: sharedResources.feedsTable,
      apiBucket: sharedResources.apiBucket
    });

    this.npmFollower = new NpmFollower(this, 'prod-npm-follower', {
      changelogsTable: sharedResources.changelogsTable,
      toCrawlTopic: sharedResources.toCrawlTopic,
      cluster: sharedResources.cluster,
    });

    this.pypiFollower = new PyPIFollower(this, 'prod-pypi-follower', {
      changelogsTable: sharedResources.changelogsTable,
      toCrawlTopic: sharedResources.toCrawlTopic
    });

    this.rubygemFollower = new RubyGemFollower(this, 'prod-rubygem-follower', {
      changelogsTable: sharedResources.changelogsTable,
      toCrawlTopic: sharedResources.toCrawlTopic
    });

    const broadcast = new BroadcastSocket(this, 'prod-broadcast', {
      redis: sharedResources.redis,
      cluster: sharedResources.cluster
    });

    const autocompleter = new Autocompleter(this, 'prod-autocomplete', {
      searchIndexTable: sharedResources.searchIndexTable
    });

    this.webFrontend = new WebFrontend(this, 'prod-web-frontend', {
      changelogsTable: sharedResources.changelogsTable,
      feedsTable: sharedResources.feedsTable,
      webBucket: sharedResources.webBucket,
      staticBucket: sharedResources.staticBucket
    });

    // A Cloudfront distribution that serves the website
    this.dist = new GlobalDistribution(this, 'prod-cloudfront-distribution', {
      webBucket: sharedResources.webBucket,
      apiBucket: sharedResources.apiBucket,
      staticBucket: sharedResources.staticBucket,
      autocompleteGateway: autocompleter.autocompleteGateway,
      broadcast: broadcast
    });
  }
}

new NpmFollowerApp().synth();
