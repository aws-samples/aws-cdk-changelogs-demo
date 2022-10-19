import { App } from 'aws-cdk-lib';
import { SharedResources } from './infrastructure/shared-resources';
//import { Core } from './infrastructure/core';

const app = new App();

new SharedResources(app, 'changelogs-md-resources');

/*new Core(app, 'changelogs-md-core', {
  vpc: sharedResources.vpc,
  githubAuthToken: sharedResources.githubToken,
  cluster: sharedResources.cluster,
  changelogsTable: sharedResources.changelogsTable,
  feedsTable: sharedResources.feedsTable,
  toCrawlTopic: sharedResources.toCrawlTopic
});*/
