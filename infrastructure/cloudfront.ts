import { App, Stack, StackProps } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_elasticloadbalancingv2 as elbv2 } from 'aws-cdk-lib';
import { aws_cloudfront as cloudfront } from 'aws-cdk-lib';
import { aws_certificatemanager as certificatemanager } from 'aws-cdk-lib';
/*import * as fs from 'fs';

var settings = fs.readFileSync('settings.json');*/

export interface GlobalDistributionProps extends StackProps {
  apiBucket: s3.Bucket,
  webBucket: s3.Bucket,
  staticBucket: s3.Bucket,
  loadBalancer: elbv2.ApplicationLoadBalancer
}

export class GlobalDistribution extends Stack {
  constructor(parent: App, id: string, props: GlobalDistributionProps) {
    super(parent, id);

    var cert = cloudfront.ViewerCertificate.fromAcmCertificate(
      certificatemanager.Certificate.fromCertificateArn(this, 'changelogs-cert', 'arn:aws:acm:us-east-1:449876148567:certificate/51d394f0-0366-4e64-95b4-4e8093224a1b'),
      {
        aliases: ['changelogs.md', 'www.changelogs.md']
      }
    );

    new cloudfront.CloudFrontWebDistribution(this, 'changelogs-distribution', {
      viewerCertificate: cert,
      originConfigs: [
        // All the static files, like CSS, JS, images, etc
        {
          customOriginSource: {
            domainName: props.staticBucket.bucketName + '.s3-website.' + this.region + '.amazonaws.com',
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
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
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
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
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
          },
          behaviors: [
            {
              pathPattern: 'api*',
              compress: true
            }
          ]
        },
        // The autocomplete endpoint
        {
          customOriginSource: {
            domainName: props.loadBalancer.loadBalancerDnsName,
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
          },
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
            domainName: props.loadBalancer.loadBalancerDnsName,
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY
          },
          behaviors: [
            {
              // Socket.io needs to make POST methods
              allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
              pathPattern: 'socket.io*',
              // Socket.io uses query strings
              forwardedValues: { queryString: true, cookies: { forward: 'all' } }
            }
          ]
        }
      ]
    });
  }
}