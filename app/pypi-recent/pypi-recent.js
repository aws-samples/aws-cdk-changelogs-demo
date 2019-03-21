// Handler that checks PyPi recently updated packages once a minute
// to identify Python repositories to crawl
var PyPI = require(process.cwd() + '/lib/pypi');

exports.handle = async function() {
  await PyPI.upsertRecentPackageRepos();
};
