import { App, Stack, Duration } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_sns as sns } from 'aws-cdk-lib';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export interface CrawlerProps {
  vpc: ec2.Vpc,

  githubAuthToken: string,

  changelogsTable: dynamodb.Table;
  feedsTable: dynamodb.Table;
  searchIndexTable: dynamodb.Table;

  webBucket: s3.Bucket;
  apiBucket: s3.Bucket;

  toCrawlTopic: sns.Topic;
}

// Lambda function that crawls a specific changelog
export class Crawler extends Stack {
  constructor(parent: App, id: string, props: CrawlerProps) {
    super(parent, id);

    // Create a lambda that does the crawl
    const crawlLambda = new lambda.Function(this, 'crawl-lambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'crawl.handle',
      code: lambda.Code.fromAsset('./app/crawl'),
      timeout: Duration.seconds(30),
      vpc: props.vpc,
      environment: {
        GITHUB_AUTH_TOKEN: props.githubAuthToken,
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        FEEDS_TABLE_NAME: props.feedsTable.tableName,
        SEARCH_INDEX_TABLE_NAME: props.searchIndexTable.tableName,
        API_BUCKET_NAME: props.apiBucket.bucketName,
        WEB_BUCKET_NAME: props.webBucket.bucketName,
      }
    });

    // Attach the lambda to the SNS topic so that when the follower
    // publishes to the SNS topic the Lambda gets invoked.
    const crawlEventSource = new SnsEventSource(props.toCrawlTopic);
    crawlLambda.addEventSource(crawlEventSource);

    // Grant the lambda permission to modify the tables
    props.changelogsTable.grantReadWriteData(crawlLambda);
    props.feedsTable.grantReadWriteData(crawlLambda);
    props.searchIndexTable.grantReadWriteData(crawlLambda);

    // Grant the lambda permission to write to the buckets
    props.webBucket.grantReadWrite(crawlLambda);
    props.apiBucket.grantReadWrite(crawlLambda);
  }
}