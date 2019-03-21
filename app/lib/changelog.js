var AWS = require('aws-sdk');
var DocumentClient = new AWS.DynamoDB.DocumentClient();
var SNS = new AWS.SNS();
var _ = require('lodash');

var ONE_DAY = 86400000;
var ONE_MINUTE = 3600000;

function Changelog() {
  this.changelogName = process.env.CHANGELOGS_TABLE_NAME || 'no changelog table name set';
  this.feedsName = process.env.FEEDS_TABLE_NAME || 'no feed table name set';
  this.discoveredTopicArn = process.env.DISCOVERED_TOPIC_NAME || 'no discovered changelog topic name set';
}
module.exports = new Changelog();

/**
  * Check to see if we have crawled this changelog before in the past,
  * and if so we may have some metadata for it already.
**/
Changelog.prototype.getMetadata = async function(changelog) {
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
Changelog.prototype.bulkGetMetadata = async function(changelogs) {
  var query = {};

  // Construct the bulk fetch query
  query[this.changelogName] = {
    Keys: changelogs.map(function(changelog) {
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
Changelog.prototype.upsertOne = async function(changelog) {
  var self = this;

  console.log(`Adding ${changelog}`);

  var results = await DocumentClient.update({
    TableName: self.changelogName,
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

  var metadata = results.Attributes;

  if (metadata && metadata.discoveredAt && metadata.discoveredAt > Date.now() - ONE_MINUTE) {
    // Skip because we probably have a pending crawl already in progress
    console.log(`Skipping ${changelog} because it was recently discovered`);
    return;
  } else if (metadata && metadata.crawledAt && metadata.crawledAt > Date.now() - ONE_DAY) {
    // Skip because we successfully crawled it recently.
    console.log(`Skipping ${changelog} because it was recently successfully crawled`);
    return;
  } else if (metadata && metadata.rejectedAt && metadata.rejectedAt > Date.now() - ONE_DAY) {
    // Skip because we tried to crawl it recently but failed.
    console.log(`Skipping ${changelog} because it was recently rejected`);
    return;
  } else {
    console.log('Triggering a crawl of ' + changelog);

    // Note that we do not await here, no need to wait on SNS before
    // continuing to the next repo and changelog
    SNS.publish({
      Message: changelog,
      TopicArn: self.discoveredTopicArn,
    }).promise();

    return true;
  }
};

/**
  * Upsert one or more discovered changelogs.
**/
Changelog.prototype.upsert = async function(changelogs) {
  changelogs = [].concat(changelogs);

  changelogs.map(function(changelog) {
    return changelog.trim().toLowerCase();
  });

  for (var changelog of changelogs) {
    await this.upsertOne(changelog);

    await new Promise(function(resolve) {
      setTimeout(resolve, 250);
    });
  }
};

/**
  * No changelog found, or else there was some issue that stopped
  * us from crawling this changelog.
**/
Changelog.prototype.reject = async function(changelog) {
  return await DocumentClient.update({
    TableName: this.changelogName,
    Key: { changelog: changelog },
    UpdateExpression: 'SET #r = :t, #c = :z',
    ExpressionAttributeNames: {
      '#r': 'rejectedAt',
      '#c': 'crawledAt'
    },
    ExpressionAttributeValues: {
      ':t': Date.now(),
      ':z': 0
    },
    ReturnValues: 'NONE'
  }).promise();
};

Changelog.prototype.recentlyUpdated = async function() {
  var response = await DocumentClient.get({
    TableName: this.feedsName,
    Key: { feed: 'recently_updated' }
  }).promise();

  if (!response || !response.Item || !response.Item.items) {
    return [];
  }

  var feedItems = response.Item.items.values.map(function(feedItem) {
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
Changelog.prototype.crawled = async function(changelog, meta) {
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

  var feedItems = feedData.Attributes.items.values.map(function(feedItem) {
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
  var keysToRemove = toRemove.map(function(feedItemToRemove) {
    return feedItemToRemove.repo + ':' + feedItemToRemove.when;
  });

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

Changelog.prototype._scanOutdatedFromKey = async function(key) {
  var results = await DocumentClient.scan({
    ExclusiveStartKey: key,
    TableName: this.changelogName,
    FilterExpression: 'crawledAt > :z AND crawledAt < :cutOff',
    ExpressionAttributeValues: {
      ':z': 0,
      ':cutOff': (Date.now() - ONE_DAY)
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

  var moreChangelogs = await this._scanOutdatedFromKey(results.LastEvaluatedKey);

  return changelogs.concat(moreChangelogs);
};

/**
  * Scan through the collection for changelogs that need recrawling
**/
Changelog.prototype.scanForOutdatedChangelogs = async function() {
  return await this._scanOutdatedFromKey(null);
};
