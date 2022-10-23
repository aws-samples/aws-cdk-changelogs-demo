// This little program runs constantly, following changes
// to NPM's CouchDB, and triggering the rest of the serverless
// workflow to crawl the individual repos and Git repos
import ChangesStream from 'changes-stream';
import * as Changelog from './lib/changelog.js';
import * as Discovery from './lib/npm-discovery.js';
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

  var changedPackage = change.id;

  console.log(`NPM - ${changedPackage} updated`);

  var repos = await Discovery.packageNamesToRepos([changedPackage]);

  if (!repos.length) {
    // No repo found
    return;
  }

  console.log(`NPM - ${changedPackage} has repo: ${repos[0]}`);

  await Changelog.upsert(repos[0]);
});

changes.on('error', async function (error) {
  console.log('Error following NPM: ', error)
});

console.log('NPM follower started');
