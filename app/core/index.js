// Start the NPM watcher
require('./components/npm-watcher');

// Start the PyPI watcher
require('./components/pypi-watcher');

// Start the Ruby Gems watcher
require('./components/rubygem-watcher');

// Start the recrawl watcher
require('./components/recrawl-watcher');

// Start the homepage regenerator
require('./components/regenerate-homepage');

var app = require('express')();
var server = require('http').Server(app);
var cors = require('cors');

// Accept requests from all origins
app.use(cors());

// Setup the websocket broadcast module
Broadcast = require(process.cwd() + '/components/lib/broadcast');
Broadcast.setup(server);

var Indexer = require(process.cwd() + '/components/lib/indexer');

// This supplies a route for the application load balancer
// to healthcheck on.
app.get('/', function (req, res) {
  res.send('Healthy');
});

app.get('/search', async function (req, res) {
  if (!req.query.q) {
    return res.send(400);
  }

  console.log(`Query: ${req.query.q}`);

  var results = await Indexer.completion(req.query.q);
  res.send(results);
});

server.listen(80);
