# changelogs.md

This is an open source application designed to showcase the usage of modern serverless compute platforms such as [AWS Lambda](https://aws.amazon.com/lambda/) and [AWS Fargate](https://aws.amazon.com/blogs/aws/aws-fargate/). It is built and deployed using the [AWS Cloud Development Kit (CDK)](https://docs.aws.amazon.com/CDK/latest/userguide/what-is.html)

This application is a Github changelog crawler and parser. It follows the NPM registry to watch for newly published NPM packages, then checks the Github for each package for changelog files, parses the file, and then exposes both a human readable HTML and machine readable JSON file with the changelog content.

![architecture diagram](/docs/architecture.png)

### Development Environment

This application is coded, built, and deployed using [node.js](https://nodejs.org/en/). You will need to ensure that Node 9.0.0+ is installed on your local machine.

Additionally [Docker](https://www.docker.com/) is used for building the images that get run in AWS Fargate.

In order to deploy the application you need to install and configure the AWS CDK:

```bash
npm install -g aws-cdk
cdk --version
```

You will also need to run `npm install` twice, once in the root of the application folder to install the dependencies used during build time to setup the AWS cloud infrastructure, and once in the `/app` folder to install the depenencies that changelogs.md uses at runtime.

Once all the dependencies are installed you can build and deploy the application onto your own AWS account using:

```bash
cdk deploy
```

Deploying from scratch typically takes around 30 minutes (most of which is spent on a CloudFront distribution rollout). While you wait you can check out [the CDK app](/changelogs-md.js) that defines all the infrastructure.

If you want to change part of the application and redeploy just that part you can do so with a command like:

```bash
cdk deploy crawler
```

### Github Access Token

This application uses the Github API to discover changelogs in repositories. For a less limited Github API access you need to configure an access token:

1) Generate a Github access token for yourself: https://github.com/settings/tokens
2) Put the token in to `/secrets/github-acces-token.json`:

```json
{
  "clientId": "<your client id>",
  "secret": "<your secret token>"
}
```

### Domain name and SSL

You will need to supply you own domain name and SSL cert if you want to deploy the site. The configuration should be put in a file `domain.json` in the root of the repo:

```
{
  "names": [
    "<your (sub)domain name"
  ],
  "acmCertRef": "<your cert arn>"
}
```

## License Summary

 This sample code is made available under a modified MIT license. See the LICENSE file.