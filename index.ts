import { App } from 'aws-cdk-lib';
import { SharedResources } from './infrastructure/shared-resources';
import { Core } from './infrastructure/core';
import { GlobalDistribution } from './infrastructure/cloudfront';

const app = new App();

// Underlying shared resources like S3 bucket, as well
// as persistent resources like DynamoDB tables, and LB's
var sharedResources = new SharedResources(app, 'changelogs-md-resources');

// The core application service that powers everything
new Core(app, 'changelogs-md-core', {
  vpc: sharedResources.vpc,
  githubAuthToken: sharedResources.githubToken,
  cluster: sharedResources.cluster,
  changelogsTable: sharedResources.changelogsTable,
  feedsTable: sharedResources.feedsTable,
  searchIndexTable: sharedResources.searchIndexTable,
  apiBucket: sharedResources.apiBucket,
  webBucket: sharedResources.webBucket,
  listener: sharedResources.listener
});

// The CloudFront distribution that glues together the
// static asset storage and the dynamic endpoints
new GlobalDistribution(app, 'changelogs-md-dist', {
  apiBucket: sharedResources.apiBucket,
  webBucket: sharedResources.webBucket,
  staticBucket: sharedResources.staticBucket,
  loadBalancer: sharedResources.loadBalancer
});
