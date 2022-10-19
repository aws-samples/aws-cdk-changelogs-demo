function Broadcast() {
  this.io = null;
}
module.exports = new Broadcast();

Broadcast.prototype.setup = function (server) {
  this.io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Greet new connections to the socket.io endpoint
  this.io.on('connection', function (socket) {
    console.log('BROADCAST - New connection');
    socket.emit('welcome');
  });
};

/**
  * Send via Redis pub/sub
**/
Broadcast.prototype.notify = function (changelog, details) {
  var payload = {
    changelog: changelog,
    crawledAt: details.crawledAt,
    href: details.href,
    repo: details.repo,
    changelogUrl: details.changelog,
    version: details.contents[0].version
  };

  if (this.io) {
    console.log(`BROADCAST - ${changelog}`);
    this.io.emit('crawled_repo', payload);
  } else {
    console.error('Broadcast IO not yet setup');
  }
};
