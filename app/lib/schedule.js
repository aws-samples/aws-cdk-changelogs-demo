var AWS = require('aws-sdk');
var DocumentClient = new AWS.DynamoDB.DocumentClient();
var changelog = require(process.cwd() + '/lib/changelog');

var ONE_DAY_IN_SECONDS = 60 * 60 * 24;
var ONE_MINUTE_IN_SECONDS = 60;

function Schedule() {
  this.scheduleName = process.env.SCHEDULE_TABLE_NAME || 'no schedule table name set';
  this.feedsName = process.env.FEEDS_TABLE_NAME || 'no feed table name set';
}
module.exports = new Schedule();

Schedule.prototype.secondOfDay = function() {
  var today = new Date();
  var absolute = new Date();

  absolute.setHours(0);
  absolute.setMinutes(0);
  absolute.setSeconds(0);

  return (today.getTime() - absolute.getTime()) / 1000;
};

/**
  * Schedule a crawl for a changelog in the future. Each day is defined as a bucket
  * with 86,400 buckets, one for each second of the day. A changelog can be
  * placed into any one of these buckets, and when the second for that bucket has
  * passed it will be recrawled.
**/
Schedule.prototype.scheduleCrawl = async function(changelog) {
  var today = new Date();
  var absolute = new Date();

  absolute.setHours(0);
  absolute.setMinutes(0);
  absolute.setSeconds(0);

  var secondBucket = this.secondOfDay();

  await DocumentClient.put({
    TableName: this.scheduleName,
    Item: {
      second: secondBucket,
      changelog: changelog
    }
  });

  return secondBucket;
};

Schedule.prototype._querySecondBucket = async function(second, lastKey) {
  var results = await DocumentClient.query({
    ExclusiveStartKey: lastKey,
    TableName: this.scheduleName,
    KeyConditionExpression: 'second = :sec',
    ExpressionAttributeValues: {
      ':sec': second
    },
    Select: 'SPECIFIC_ATTRIBUTES',
    ProjectionExpression: 'changelog'
  });

  var changelogs = results.Items.map(function(item) {
    return item.changelog;
  });

  if (!results.LastEvaluatedKey) {
    return changelogs;
  }

  var moreChangelogs = await this._querySecondBucket(second, results.LastEvaluatedKey);

  return changelogs.concat(moreChangelogs);
};

/**
  * Check the schedule table and pop out any changelogs that
  * are ready for a recrawl
**/
Schedule.prototype.popSchedule = async function() {
  var secondBucket = this.secondOfDay();

  // Check to see when the last check was
  var lastCheck = await DocumentClient.get({
    TableName: this.feedsName,
    Key: {
      feed: 'last_recrawl_check'
    }
  });

  if (!lastCheck || !lastCheck.Item || !lastCheck.Item.items) {

  }

};
