// Handler that checks RubyGems recently updated packages once a minute
// to identify Ruby repositories to crawl
var Crawl = require(process.cwd() + '/components/lib/crawl');

var CHECK_INTERVAL = 500;
var lastSecond = 0;

async function checkRecrawl() {
  var dt = new Date();
  var second = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());

  if (second !== lastSecond) {
    lastSecond = second;
    await Crawl.recrawl(second);
  }

  setTimeout(checkRecrawl, CHECK_INTERVAL);
};

checkRecrawl();