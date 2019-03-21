var Crawl = require('./lib/crawl');
var Presentation = require('./lib/presentation');
var Indexer = require('./lib/indexer');
var Broadcast = require('./lib/broadcast');

// Github repo discovery mechanism. Watches NPM for updated packages, and
// schedules discovered Github repos for crawling.
exports.handle = async function(e) {
  if (!e.Records || !e.Records.length) {
    throw new Error('Malformed input, expected list of records');
  }

  var record = e.Records[0];

  if (!record.Sns) {
    throw new Error('Malformed input expected record source to be SNS');
  }

  var changelog = record.Sns.Message;

  // Normalize incoming changelogs
  changelog = changelog.trim().toLowerCase();

  console.log(`Crawling changelog in repo ${changelog}`);

  // Crawl the repo for the changelog and parse it.
  var results = await Crawl.crawlRepo(changelog);

  if (!results) {
    console.log(`Done because crawl found nothing for ${changelog}`);
    return;
  }

  console.log('Rendering HTML and JSON');

  // Render the HTML pages and webpage
  await [
    Presentation.saveApiResponse(changelog, results),
    Presentation.saveWebPage(changelog, results)
  ];

  console.log('Indexing keywords');

  // Add the changelog to the index
  await Indexer.addToIndex(changelog, results);

  console.log('Broadcasting to websocket');

  Broadcast.notify(changelog, results);

  console.log('Done!');
};
