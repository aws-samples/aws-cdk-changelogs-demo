PyPI = require(process.cwd() + '/components/lib/pypi');

var CHECK_INTERVAL = 120 * 1000;

async function checkPyPi() {
  console.log('PYPI - Checking for packages');
  await PyPI.upsertRecentPackageRepos();
  setTimeout(checkPyPi, CHECK_INTERVAL);
}

checkPyPi();