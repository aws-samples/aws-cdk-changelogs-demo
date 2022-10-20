function Orchestrator() {

}
module.exports = new Orchestrator();

var Crawl = require(process.cwd() + '/components/lib/crawl');
var Presentation = require(process.cwd() + '/components/lib/presentation');
var Indexer = require(process.cwd() + '/components/lib/indexer');
var Broadcast = require(process.cwd() + '/components/lib/broadcast');

/**
 * changelog: string
 */
Orchestrator.prototype.crawlRepo = async function (changelog) {
  // Normalize incoming changelogs
  changelog = changelog.trim().toLowerCase();

  console.log(`CORE - ${changelog} begin crawl`);

  // Crawl the repo for the changelog and parse it.
  var results = await Crawl.crawlRepo(changelog);

  if (!results) {
    console.log(`CORE - ${changelog} end crawl`);
    return;
  }

  console.log(`CORE - ${changelog} - Rendering HTML and JSON`);

  // Render the HTML pages and webpage
  await Presentation.saveApiResponse(changelog, results);
  await Presentation.saveWebPage(changelog, results);

  console.log(`CORE - ${changelog} - Indexing keywords`);

  // Add the changelog to the index
  await Indexer.addToIndex(changelog, results);

  console.log(`CORE - ${changelog} - Broadcasting to websocket`);

  Broadcast.notify(changelog, results);

  console.log(`CORE - ${changelog} - Done!`);
}