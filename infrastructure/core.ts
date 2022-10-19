import { App, Stack } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_ecs as ecs } from 'aws-cdk-lib';
import { aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_sns as sns } from 'aws-cdk-lib';

export interface CoreProps {
  vpc: ec2.Vpc,
  cluster: ecs.Cluster,
  githubAuthToken: secretsmanager.Secret,
  changelogsTable: dynamodb.Table;
  feedsTable: dynamodb.Table;
  toCrawlTopic: sns.Topic;
}

// The core ECS service that orchestrates operations
export class Core extends Stack {
  private taskDefinition: ecs.TaskDefinition;
  public service: ecs.FargateService;

  constructor(parent: App, id: string, props: CoreProps) {
    super(parent, id);

    this.taskDefinition = new ecs.FargateTaskDefinition(this, 'core-task-definition', {
      cpu: 1024,
      memoryLimitMiB: 2048,
    });

    this.taskDefinition.addContainer("core", {
      image: ecs.ContainerImage.fromAsset("./app/core"),
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        FEEDS_TABLE_NAME: props.feedsTable.tableName,
        DISCOVERED_TOPIC_ARN: props.toCrawlTopic.topicArn
      },
      secrets: {
        GITHUB_AUTH_TOKEN: ecs.Secret.fromSecretsManager(props.githubAuthToken)
      }
    });

    this.service = new ecs.FargateService(this, 'core-service', {
      taskDefinition: this.taskDefinition,
      cluster: props.cluster,
    });
  }
}