var app = require('express')();
var server = require('http').Server(app);
var cors = require('cors');
var redis = require('socket.io-redis');

var io = require('socket.io')(server, {
  pingTimeout: 60000
});

// Accept requests from all origins
app.use(cors());
io.origins((origin, callback) => {
  callback(null, true);
});

// Make Socket.io listen to Redis for pub/sub broadcasts
io.adapter(redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}));

// This supplies a route for the application load balancer
// to healthcheck on.
app.get('/', function(req, res) {
  res.send('Healthy');
});

// Greet new connections to the socket.io endpoint
io.on('connection', function(socket) {
  console.log('New connection');
  socket.emit('welcome');
});

server.listen(80);
