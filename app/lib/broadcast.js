// Logic that is associated with broadcasting the fact that a changelog has
// just been crawled. This broadcast is sent via Redis pub/sub, and picked up
// by a Fargate container running at the edge which maintains a websocket
// connection to the visitors browser. The container then pushes a message to
// the browser, so that it can be updated in realtime to show that something
// was recently crawled.
var emitter = require('socket.io-emitter');

function Broadcast() {
  this.io = emitter({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  });

  this.io.redis.on('error', function(e) {
    console.error(e);
  });
}
module.exports = new Broadcast();

/**
  * Send via Redis pub/sub
**/
Broadcast.prototype.notify = function(changelog, details) {
  var payload = {
    changelog: changelog,
    crawledAt: details.crawledAt,
    href: details.href,
    repo: details.repo,
    changelogUrl: details.changelog,
    version: details.contents[0].version
  };

  this.io.emit('crawled_repo', payload);
};

