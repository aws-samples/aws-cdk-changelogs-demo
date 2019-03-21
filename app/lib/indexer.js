var AWS = require('aws-sdk');
var DocumentClient = new AWS.DynamoDB.DocumentClient();
var _ = require('lodash');

function Indexer() {
  this.searchIndex = process.env.SEARCH_INDEX_TABLE_NAME || 'search index table name not set';
}
module.exports = new Indexer();

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

/**
  * Super simple autocomplete indexing algorithm. It just breaks the
  * input project name into fragments, generates a score for each fragment
  * where the score is roughly equivalent to how much of each token is
  # made up of the fragment.
**/
Indexer.prototype.addToIndex = async function(changelog) {
  var keywords = changelog.split(/[\/-]/g);
  var frags = [];
  var keyword;
  var fragMap = {};
  var frag;

  // This is used to set the TTL for each autocomplete. This causes
  // autocomplete fragments to automatically expire out of the table
  // unless they are reindexed at least once a day.
  var validUntil = Math.floor(Date.now() / 1000) + ONE_DAY_IN_SECONDS;

  // Generate a bunch of typing fragements, starting from
  // two characters up to an entire keyword from the project name
  for (keyword of keywords) {
    for (var i = 2; i <= keyword.length; i++) {
      frag = keyword.substr(0, i);
      if (fragMap[frag]) {
        continue;
      }

      // Add the frag to the list
      frags.push({
        fragment: frag,
        score: 0,
        complete: changelog
      });

      // Remember that we already have this frag
      fragMap[frag] = true;
    }
  }

  // Generate a score for each fragment and how relevant it is to this result
  // The goal is to store them with the fragment as the primary key and the
  // score as the secondary key, such that it can easily return the highest
  // scored fragment for each primary key fragment we search for.
  for (frag of frags) {
    for (keyword of keywords) {
      if (keyword.startsWith(frag.fragment)) {
        frag.score = Math.max(frag.score, (frag.fragment.length / keyword.length));
      }
    }
  }

  // Convert all the scores to fixed length strings
  // This allows them to be easily sorted by the secondary index
  for (frag of frags) {
    frag.score = frag.score.toFixed(10);
  }

  // We can write up to 25 items per batch
  var fragChunks = _.chunk(frags, 25);
  var promises = [];

  for (var fragChunk of fragChunks) {
    var batchOperation = {
      RequestItems: {}
    };

    batchOperation.RequestItems[this.searchIndex] = fragChunk.map(function(frag) {
      return {
        PutRequest: {
          Item: {
            fragment: frag.fragment,
            score: `${frag.score}:${frag.complete}`,
            validUntil: validUntil
          }
        }
      };
    });

    promises.push(DocumentClient.batchWrite(batchOperation).promise());
  }

  // Wait for all the batch operations to finish
  await Promise.all(promises);
};

/**
  * For a given fragment return potentially relevant completions
**/
Indexer.prototype.completion = async function(fragment) {
  // This is used to filter out expired fragments that haven't
  // yet been physically removed from the table by DynamoDB
  var now = Math.floor(Date.now() / 1000);

  var results = await DocumentClient.query({
    TableName: this.searchIndex,
    KeyConditionExpression: 'fragment = :frag',
    FilterExpression: 'validUntil > :now',
    ExpressionAttributeValues: {
      ':frag': fragment,
      ':now': now
    },
    Limit: 10,
    ScanIndexForward: false
  }).promise();

  // Post process the results to split the completion back out from
  // the score, and turn the score back into a real number
  var toReturn = [];
  for (var i of results.Items) {
    var components = i.score.split(':');

    toReturn.push({
      score: parseFloat(components[0]),
      completion: components[1]
    });
  }

  return toReturn;
};
