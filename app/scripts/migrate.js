// A quick migration script that moves changelogs from one region to another
var AWS = require('aws-sdk');

var regionOneClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
var regionTwoClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });
var regionTwoSns = new AWS.SNS({region: 'us-east-2'});

async function scanFromKey(key) {
  var results = await regionOneClient.scan({
    ExclusiveStartKey: key,
    TableName: 'changelogs',
    FilterExpression: 'crawledAt > :z',
    ExpressionAttributeValues: {
      ':z': 0
    },
    Select: 'SPECIFIC_ATTRIBUTES',
    ProjectionExpression: 'changelog'
  }).promise();

  var changelogs = results.Items.map(function(item) {
    return item.changelog;
  });

  if (!results.LastEvaluatedKey) {
    return changelogs;
  }

  var moreChangelogs = await scanFromKey(results.LastEvaluatedKey);

  return changelogs.concat(moreChangelogs);
}

async function main() {
  var results = await scanFromKey(null);

  for (var changelog of results) {
    console.log(`Changelog: ${changelog}`);

    var res = await regionTwoClient.update({
      TableName: 'shared-resources-Changelogs45E84A8B-8EDW9OFRZCST',
      Key: { changelog: changelog },
      UpdateExpression: 'SET #d = :t',
      ExpressionAttributeNames: {
        '#d': 'discoveredAt'
      },
      ExpressionAttributeValues: {
        ':t': Date.now()
      },
      ReturnValues: 'ALL_OLD'
    }).promise();

    await regionTwoSns.publish({
      Message: changelog,
      TopicArn: 'arn:aws:sns:us-east-2:449876148567:shared-resources-tocrawlB83923CA-PP8NW55CQJI4',
    }).promise();

    await new Promise(function(resolve, reject) {
      setTimeout(resolve, 250);
    });
  }

  console.log(results);
}

main();

