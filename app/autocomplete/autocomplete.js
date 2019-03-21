var Indexer = require('./lib/indexer');

// Submit a fragment for autocompletion and get results
exports.handle = async function(e) {
  var params = e.queryStringParameters;

  if (!params) {
    return {
      statusCode: 200,
      body: '[]'
    };
  }

  console.log(`Query: ${params.q}`);

  var results = await Indexer.completion(params.q);

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
};
