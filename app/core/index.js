// Start the NPM watcher
import './components/npm-watcher.js';

// Start the PyPI watcher
import './components/pypi-watcher.js';

// Start the Ruby Gems watcher
import './components/rubygem-watcher.js';

// Start the recrawl watcher
import './components/recrawl-watcher.js';

// Start the homepage regenerator
import './components/regenerate-homepage.js';

import express from 'express';
const app = express();

import http from 'http';
var server = http.Server(app);

import cors from 'cors';

// Accept requests from all origins
app.use(cors());

// Setup the websocket broadcast module
import * as Broadcast from './components/lib/broadcast.js';
Broadcast.setup(server);

import * as Indexer from './components/lib/indexer.js';

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
