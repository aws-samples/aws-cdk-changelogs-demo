// Handler that checks RubyGems recently updated packages once a minute
// to identify Ruby repositories to crawl
var RubyGems = require(process.cwd() + '/components/lib/ruby-gems');

var CHECK_INTERVAL = 120 * 1000;

async function checkRubyGems() {
  console.log('RUBY - Checking for new gems');
  await RubyGems.upsertRecentPackageRepos();
  setTimeout(checkRubyGems, CHECK_INTERVAL);
};

checkRubyGems();