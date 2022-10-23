import { Server as SocketIOServer } from 'socket.io';
var io = null;

/**
 * Given an HTTP server, attach a Socket.io instance to it.
 * @param {*} server
 */
export const setup = function (server) {
  io = new SocketIOServer(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Greet new connections to the socket.io endpoint
  io.on('connection', function (socket) {
    console.log('BROADCAST - New connection');
    socket.emit('welcome');
  });
};

/**
  * Send via Redis pub/sub
**/
export const notify = function (changelog, details) {
  var payload = {
    changelog: changelog,
    crawledAt: details.crawledAt,
    href: details.href,
    repo: details.repo,
    changelogUrl: details.changelog,
    version: details.contents[0].version
  };

  if (io) {
    console.log(`BROADCAST - ${changelog}`);
    io.emit('crawled_repo', payload);
  } else {
    console.error('Broadcast IO not yet setup');
  }
};
