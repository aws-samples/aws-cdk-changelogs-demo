# changelogs.md

This is an open source application designed to showcase the usage of modern
serverless compute platforms such as [AWS Lambda](https://aws.amazon.com/lambda/)
and [AWS Fargate](https://aws.amazon.com/blogs/aws/aws-fargate/). It is built
and deployed using the [AWS Cloud Development Kit (CDK)](https://docs.aws.amazon.com/CDK/latest/userguide/what-is.html)

This application is a Github changelog crawler and parser. It follows the [NPM](https://www.npmjs.com/), [PyPI](https://pypi.org/), and [RubyGems](https://rubygems.org/)
package registries to watch for newly published code, then checks the Github
for each package for changelog files, parses the file, and then exposes both
a human readable HTML and machine readable JSON file with the changelog content.

![architecture diagram](/docs/architecture.png)

For a full explanation of this architecture see the [/docs](/docs) folder

### Development Environment

This application is coded, built, and deployed using [node.js](https://nodejs.org/en/).
You will need to ensure that Node 9.0.0+ is installed on your local machine.

Additionally [Docker](https://www.docker.com/) is used for building the
images that get run in AWS Fargate.

In order to deploy the application you need to first setup the development
environment with all the dependencies:

```bash
npm run-script setup
```

This will install the right version of the AWS CDK locally to this project,
as well as all the CDK dependencies necessary to construct the application.
It will also install the NPM dependencies that the application needs at
runtime. The next step is to deploy the app onto your AWS account:

```bash
npm run-script deploy
```

Deploying from scratch typically takes around 30 minutes (most of which is
spent on a CloudFront distribution rollout). While you wait you can
check out [the CDK app](/changelogs-md.js) that defines all the infrastructure.

If you want to see ahead of time what CloudFormation templates will be deployed
then run:

```bash
npm run-script synth
```

Then check the contents of the `/synth` folder that is generated. You will find
several thousands lines of generated CloudFormation template defining the
underlying resources of the application stack.

If you want to change part of the application and redeploy just that part
you can do so with a command like:

```bash
./node_modules/.bin/cdk deploy crawler
```

### Github Access Token

This application uses the Github API to discover changelogs in repositories.
For a less limited Github API access you need to configure an access token:

1) Generate a Github access token for yourself: https://github.com/settings/tokens
2) Put the token in to `/secrets/github-access-token.json`:

```json
{
  "token": "<your personal access token>"
}
```

### Domain name and SSL

You will need to supply you own domain name and SSL cert if you want to deploy
the site. The configuration should be put in a file `settings.json` in the root
of the repo:

```
{
  "names": [
    "<your (sub)domain name"
  ],
  "acmCertRef": "<your cert arn>"
}
```

### Cleanup

To destroy any resources you have created for this example:

```bash
npm run-script destroy
```

## License Summary

 This sample code is made available under a modified MIT license.
 See the LICENSE file.
