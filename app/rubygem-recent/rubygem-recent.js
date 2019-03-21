// Handler that checks RubyGems recently updated packages once a minute
// to identify Ruby repositories to crawl
var RubyGems = require(process.cwd() + '/lib/ruby-gems');

exports.handle = async function() {
  await RubyGems.upsertRecentPackageRepos();
};
