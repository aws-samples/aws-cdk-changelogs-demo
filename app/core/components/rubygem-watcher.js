// Handler that checks RubyGems recently updated packages once a minute
// to identify Ruby repositories to crawl
import * as RubyGems from './lib/ruby-gems.js';

var CHECK_INTERVAL = 120 * 1000;

async function checkRubyGems() {
  console.log('RUBY - Checking for new gems');
  await RubyGems.upsertRecentPackageRepos();
  setTimeout(checkRubyGems, CHECK_INTERVAL);
};

checkRubyGems();