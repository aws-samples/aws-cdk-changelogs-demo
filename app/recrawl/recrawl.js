var Crawl = require(process.cwd() + '/lib/crawl');

// Handler that triggers a recrawl of outdated changelogs that haven't
// been crawled recently.
exports.handle = async function() {
  await Crawl.recrawl();
};
