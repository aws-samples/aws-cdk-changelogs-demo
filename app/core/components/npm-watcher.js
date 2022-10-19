// This little program runs constantly, following changes
// to NPM's CouchDB, and triggering the rest of the serverless
// workflow to crawl the individual repos and Git repos
var ChangesStream = require('changes-stream');
var Changelog = require('./lib/changelog');
var Discovery = require('./lib/npm-discovery');
var changes = new ChangesStream({
  db: 'https://skimdb.npmjs.com/registry',
  since: 'now'
});

// This gets called whenever there is an updated NPM package
changes.on('readable', async function () {
  var change = changes.read();

  if (!change.id) {
    return;
  }

  var package = change.id;

  console.log(`NPM - ${package} updated`);

  var repos = await Discovery.packageNamesToRepos([package]);

  if (!repos.length) {
    // No repo found
    return;
  }

  console.log(`NPM - ${package} has repo: ${repos[0]}`);

  await Changelog.upsert(repos[0]);
});

changes.on('error', async function (error) {
  console.log('Error following NPM: ', error)
});

console.log('NPM follower started');
