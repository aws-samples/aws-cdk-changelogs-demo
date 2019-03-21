var Presentation = require(process.cwd() + '/lib/presentation');
var Changelog = require(process.cwd() + '/lib/changelog');

// Handler that triggers the homepage regeneration once
// a minute.
exports.handle = async function() {
  var recentlyUpdated = await Changelog.recentlyUpdated();

  var recentlyCrawled = {
    href: '/api/recently-crawled',
    content: recentlyUpdated.map(function(item) {
      item.href = '/api/github/' + item.repo;
      item.when = new Date(item.when);
      return item;
    })
  };

  await Presentation.saveRecentlyCrawled(recentlyCrawled);
};
