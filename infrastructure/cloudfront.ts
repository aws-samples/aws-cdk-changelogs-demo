import { App, Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_ecs as ecs } from 'aws-cdk-lib';
import { aws_secretsmanager as secretsmanager } from 'aws-cdk-lib';

interface GlobalDistributionProps {
  apiBucket: s3.Bucket,
  webBucket: s3.Bucket,
  staticBucket: s3.Bucket,

}

export class GlobalDistribution extends Stack {
  constructor(parent: App, id: string, props: CoreProps) {
    super(parent, id);

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
