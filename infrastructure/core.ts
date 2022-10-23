import { App, Stack, Duration } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_ecs as ecs } from 'aws-cdk-lib';
import { aws_ecr_assets as ecrAssets } from 'aws-cdk-lib';
import { aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_logs as logs } from 'aws-cdk-lib';
import { aws_elasticloadbalancingv2 as elbv2 } from 'aws-cdk-lib';


export interface CoreProps {
  vpc: ec2.Vpc,
  cluster: ecs.Cluster,
  githubAuthToken: secretsmanager.Secret,
  changelogsTable: dynamodb.Table;
  searchIndexTable: dynamodb.Table;
  feedsTable: dynamodb.Table;
  apiBucket: s3.Bucket,
  webBucket: s3.Bucket,
  listener: elbv2.ApplicationListener
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
      runtimePlatform: {
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
      }
    });

    var container = this.taskDefinition.addContainer("core", {
      image: ecs.ContainerImage.fromAsset("./app/core", {
        platform: ecrAssets.Platform.LINUX_ARM64
      }),
      environment: {
        CHANGELOGS_TABLE_NAME: props.changelogsTable.tableName,
        FEEDS_TABLE_NAME: props.feedsTable.tableName,
        SEARCH_INDEX_TABLE_NAME: props.searchIndexTable.tableName,
        API_BUCKET_NAME: props.apiBucket.bucketName,
        WEB_BUCKET_NAME: props.webBucket.bucketName,
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
      },
      secrets: {
        GITHUB_AUTH_TOKEN: ecs.Secret.fromSecretsManager(props.githubAuthToken)
      },
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: 'changelogs-core',
        logRetention: logs.RetentionDays.ONE_DAY
      })
    });

    container.addPortMappings({
      hostPort: 80,
      containerPort: 80
    });

    this.service = new ecs.FargateService(this, 'core-service', {
      taskDefinition: this.taskDefinition,
      cluster: props.cluster,
      assignPublicIp: true,
      desiredCount: 1
    });

    props.changelogsTable.grantReadWriteData(this.taskDefinition.taskRole);
    props.feedsTable.grantReadWriteData(this.taskDefinition.taskRole);
    props.searchIndexTable.grantReadWriteData(this.taskDefinition.taskRole);

    props.apiBucket.grantReadWrite(this.taskDefinition.taskRole);
    props.webBucket.grantReadWrite(this.taskDefinition.taskRole);
    props.apiBucket.grantPutAcl(this.taskDefinition.taskRole);
    props.webBucket.grantPutAcl(this.taskDefinition.taskRole);

    // Add the ECS service to the load balancer
    props.listener.addTargets('core', {
      priority: 1,
      conditions: [
        elbv2.ListenerCondition.pathPatterns(['*'])
      ],
      deregistrationDelay: Duration.seconds(10),
      port: 80,
      targets: [this.service],
    });
  }
}