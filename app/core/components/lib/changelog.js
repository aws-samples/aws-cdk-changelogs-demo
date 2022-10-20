var AWS = require('aws-sdk');
var DocumentClient = new AWS.DynamoDB.DocumentClient();
var SNS = new AWS.SNS();
var _ = require('lodash');

var ONE_DAY = 86400000;
var ONE_MINUTE = 3600000;
var SECONDS_PER_DAY = 86400;
var ONE_WEEK = ONE_DAY * 7;

function Changelog() {
  this.changelogName = process.env.CHANGELOGS_TABLE_NAME || 'no changelog table name set';
  this.feedsName = process.env.FEEDS_TABLE_NAME || 'no feed table name set';
  this.discoveredTopicArn = process.env.DISCOVERED_TOPIC_ARN || 'no discovered changelog topic arn set';
}
module.exports = new Changelog();

var Orchestrator = require(process.cwd() + '/components/lib/orchestrator');

/**
  * Check to see if we have crawled this changelog before in the past,
  * and if so we may have some metadata for it already.
**/
Changelog.prototype.getMetadata = async function (changelog) {
  var self = this;

  var result = await DocumentClient.get({
    TableName: self.changelogName,
    Key: {
      changelog: changelog
    }
  }).promise();

  return result.Item;
};

/**
  * Bulk fetch metadata for a batch of repos.
**/
Changelog.prototype.bulkGetMetadata = async function (changelogs) {
  var query = {};

  // Construct the bulk fetch query
  query[this.changelogName] = {
    Keys: changelogs.map(function (changelog) {
      return {
        changelog: changelog
      };
    })
  };

  var results = await DocumentClient.batchGet({ RequestItems: query }).promise();

  return results.Responses[this.changelogName];
};

/**
  * Upsert a newly discovered changelog. Responsible for triggering
  * business logic associated with finding a new changelog.
  *
  * @param {[string]} changelog - Name of the changelog
  * @param {function} done - Callback
**/
Changelog.prototype.upsertOne = async function (changelog) {
  var self = this;

  console.log(`REPO - ${changelog} noticed`);

  // Select a second of the day on which to recrawl this repo
  var second = Math.floor(Math.random() * SECONDS_PER_DAY);

  // Insert the metadata of the changelog into the table
  // Conditional expression will reject changelogs that have already
  // been saved into the table
  try {
    var results = await DocumentClient.update({
      TableName: self.changelogName,
      Key: { changelog: changelog },
      UpdateExpression: 'SET #d = :t, #s = :s',
      ExpressionAttributeNames: {
        '#d': 'discoveredAt',
        '#s': 'second'
      },
      ExpressionAttributeValues: {
        ':t': Date.now(),
        ':s': second
      },
      ConditionExpression: 'attribute_not_exists(#d)'
    }).promise();
  } catch (e) {
    if (e.code && e.code == 'ConditionalCheckFailedException') {
      console.log(`REPO - ${changelog} was already known`);
      return;
    } else {
      console.error(`REPO - ${changelog} failed upsert because of`, e);
      return;
    }
  }

  // If we reached this point we can safely trigger an immediate
  // crawl because this is a new changelog we just discovered.
  await Orchestrator.crawlRepo(changelog);
};

/**
  * Upsert one or more discovered changelogs.
**/
Changelog.prototype.upsert = async function (changelogs) {
  changelogs = [].concat(changelogs);

  changelogs.map(function (changelog) {
    return changelog.trim().toLowerCase();
  });

  for (var changelog of changelogs) {
    await this.upsertOne(changelog);

    await new Promise(function (resolve) {
      setTimeout(resolve, 100);
    });
  }
};

/**
 * Because of an issue with the changelog we have decided to reject it
 * for a set duration. This duration may vary based on the type of issue
 * for example repo doesn't exist, or repo has no changelog anyway,
 * or repo has empty changelog, etc.
 * @param {string} changelog
 * @param {*} duration
 */
Changelog.prototype.rejectForDuration = async function (changelog, duration) {
  return await DocumentClient.update({
    TableName: this.changelogName,
    Key: { changelog: changelog },
    UpdateExpression: 'SET #r = :t, #c = :z, #ru = :tr',
    ExpressionAttributeNames: {
      '#r': 'rejectedAt',
      '#c': 'crawledAt',
      '#ru': 'rejectedUntil'
    },
    ExpressionAttributeValues: {
      ':t': Date.now(),
      ':z': 0,
      ':tr': Date.now() + duration
    },
    ReturnValues: 'NONE'
  }).promise();
}

Changelog.prototype.recentlyUpdated = async function () {
  var response = await DocumentClient.get({
    TableName: this.feedsName,
    Key: { feed: 'recently_updated' }
  }).promise();

  if (!response || !response.Item || !response.Item.items) {
    return [];
  }

  var feedItems = response.Item.items.values.map(function (feedItem) {
    feedItem = feedItem.split(':');
    return {
      repo: feedItem[0],
      when: parseInt(feedItem[1], 10)
    };
  });

  feedItems = _.sortBy(feedItems, 'when');

  return feedItems.reverse();
};

/**
  * Mark a changelog as having been crawled.
**/
Changelog.prototype.crawled = async function (changelog, meta) {
  changelog.trim().toLowerCase();
  var self = this;

  const [changelogMetadata, feedData] = await Promise.all([
    // Update the changelog metadata in its table
    DocumentClient.update({
      TableName: self.changelogName,
      Key: { changelog: changelog },
      UpdateExpression: 'SET #r = :z, #c = :t, #u = :u, #v = :v, #d = :d',
      ExpressionAttributeNames: {
        '#r': 'rejectedAt',
        '#c': 'crawledAt',
        '#u': 'sourceUrl',
        '#v': 'versionNumber',
        '#d': 'versionDate'
      },
      ExpressionAttributeValues: {
        ':t': Date.now(),
        ':z': 0,
        ':u': meta.url,
        ':v': meta.version,
        ':d': meta.date
      },
      ReturnValues: 'ALL_NEW'
    }).promise(),

    // Add the changelog to the feed of recently crawled changelogs
    DocumentClient.update({
      TableName: self.feedsName,
      Key: { feed: 'recently_updated' },
      UpdateExpression: 'ADD #i :r',
      ExpressionAttributeNames: {
        '#i': 'items',
      },
      ExpressionAttributeValues: {
        ':r': DocumentClient.createSet([changelog + ':' + Date.now()])
      },
      ReturnValues: 'ALL_NEW'
    }).promise()
  ]);

  var feedItems = feedData.Attributes.items.values.map(function (feedItem) {
    feedItem = feedItem.split(':');
    return {
      repo: feedItem[0],
      when: parseInt(feedItem[1], 10)
    };
  });

  if (feedItems.length < 20) {
    // Feed is still short
    return;
  }

  // Identify the oldest feed items to remove.
  feedItems = _.sortBy(feedItems, 'when');
  var toRemove = feedItems.slice(0, feedItems.length - 20);
  var keysToRemove = toRemove.map(function (feedItemToRemove) {
    return feedItemToRemove.repo + ':' + feedItemToRemove.when;
  });

  if (!keysToRemove.length) {
    return;
  }

  // And do a DB operation to remove the oldest items.
  await DocumentClient.update({
    TableName: self.feedsName,
    Key: { feed: 'recently_updated' },
    UpdateExpression: 'DELETE #i :r',
    ExpressionAttributeNames: {
      '#i': 'items',
    },
    ExpressionAttributeValues: {
      ':r': DocumentClient.createSet(keysToRemove)
    },
    ReturnValues: 'ALL_NEW'
  }).promise();
};

Changelog.prototype._queryIndexForSecond = async function (second, key) {
  var results = await DocumentClient.query({
    TableName: this.changelogName,
    IndexName: 'second-changelog-index',
    KeyConditionExpression: '#s = :s',
    // This filter expression ensures that known good changelogs
    // get crawled at most once per day, and rejected repos that
    // don't have known changelogs get rechecked at most once per week
    FilterExpression: 'crawledAt < :cutOff AND rejectedAt < :rejectedCutoff AND (rejectedUntil < :now OR attribute_not_exists(rejectedUntil))',
    ExpressionAttributeNames: {
      '#s': 'second'
    },
    ExpressionAttributeValues: {
      ':s': second,
      ':cutOff': (Date.now() - ONE_DAY), // Don't recrawl things crawled within the last day
      ':rejectedCutoff': (Date.now() - ONE_WEEK), // Force don't recrawl things rejected within the last week
      ':now': Date.now()
    }
  }).promise();

  var changelogs = results.Items.map(function (item) {
    return item.changelog;
  });

  if (!results.LastEvaluatedKey) {
    return changelogs;
  }

  var moreChangelogs = await this._queryIndexForSecond(second, results.LastEvaluatedKey);

  return changelogs.concat(moreChangelogs);
};

/**
 * Uses index to locate changelogs that need to be crawled in this second and adjacent seconds
 */
Changelog.prototype.selectChangelogsToCrawl = async function (second) {
  console.log(`RECRAWL - Checking second ${second}`);
  return await this._queryIndexForSecond(second, null);
}
