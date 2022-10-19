import { App, Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_ecs as ecs } from 'aws-cdk-lib';
import { aws_sns as sns } from 'aws-cdk-lib';
import { aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';

export class SharedResources extends Stack {
  // The shared network for all the resources that need to talk to each other
  public vpc: ec2.Vpc;

  // The DynamoDB tables that store the queryable data
  public changelogsTable: dynamodb.Table;
  public feedsTable: dynamodb.Table;
  public searchIndexTable: dynamodb.Table;

  // S3 buckets that store generated HTML and JSON
  // for the public facing website and API
  public webBucket: s3.Bucket;
  public apiBucket: s3.Bucket;
  public staticBucket: s3.Bucket;

  public cluster: ecs.Cluster;

  public toCrawlTopic: sns.Topic;
  public githubToken: secretsmanager.Secret;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Network to run everything in
    this.vpc = new ec2.Vpc(this, 'vpc', {
      maxAzs: 2,
      natGateways: 0
    });

    // A table to store the list of changelogs and their metadata in
    this.changelogsTable = new dynamodb.Table(this, 'Changelogs', {
      tableName: 'changelogs',
      partitionKey: { name: 'changelog', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    // Add a secondary index that will allow us to search by
    // second to see which changelogs to crawl each second.
    this.changelogsTable.addGlobalSecondaryIndex({
      indexName: 'second-changelog-index',
      partitionKey: { name: 'second', type: dynamodb.AttributeType.NUMBER },
      sortKey: { name: 'changelog', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    });

    // A table to store the list of feeds
    this.feedsTable = new dynamodb.Table(this, 'Feeds', {
      tableName: 'feeds',
      partitionKey: { name: 'feed', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });

    // A table which stores the auto complete search index
    this.searchIndexTable = new dynamodb.Table(this, 'search-index', {
      tableName: 'search-index',
      partitionKey: { name: 'fragment', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'score', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'validUntil',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
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

    // The GitHub auth token secret
    this.githubToken = new secretsmanager.Secret(this, 'github-token', {
      secretObjectValue: {
        token: SecretValue.unsafePlainText('fake')
      },
    });
  }
}