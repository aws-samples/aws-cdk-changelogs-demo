const request = require('request-promise-native');
const URL = require('url');

var Discovery = function() {
  this.request = request.defaults({
    headers: { 'User-Agent': 'changelogs.md' },
    resolveWithFullResponse: true
  });
};
module.exports = new Discovery();

/**
  * Fetch the details of a package from NPM
**/
Discovery.prototype.packageNameToDetails = async function(packageName) {
  /* Special behavior for messy NPM registry API:
  If the package is scoped then make a request like
  `@scope/package-name/*` to fetch the latest version
  If the package is not scoped then make a request like
  `package-name/latest` to fetch the latest version
  *sigh* NPM what are you doing? */

  var subpath;
  if (packageName[0] === '@') {
    packageName = encodeURIComponent(packageName).replace(/^%40/, '@');
    subpath = packageName + '/*';
  } else {
    subpath = packageName + '/latest';
  }

  var response = await this.request(`https://registry.npmjs.org/${subpath}`);

  if (!response.statusCode === 200) {
    console.error('Failed to get npm package metadata for ' + packageName);
    return;
  }

  var results = {};
  try {
    results = JSON.parse(response.body);
  } catch (e) {
    console.log(`Failed to parse: '${packageName}'`, response.body);
  }

  return results;
};

/**
  * Turn a list of recently updated packages into a list of Github repos
**/
Discovery.prototype.packageNamesToRepos = async function(packageList) {
  var promisePackageInfo = [];
  var packageInfo = [];

  for (var packageName of packageList) {
    promisePackageInfo.push(this.packageNameToDetails(packageName));
  }

  packageInfo = await Promise.all(promisePackageInfo);

  // For each package details get the Github repo for that package.
  var repos = [];
  for (var i = 0; i < packageInfo.length; i++) {
    // Skip over packages without a repo
    if (!packageInfo[i].repository) {
      continue;
    }

    // Skip repos of non git format
    if (packageInfo[i].repository.type !== 'git') {
      continue;
    }

    // Skip repos that don't have a URL
    var url = packageInfo[i].repository.url;
    if (!url) {
      continue;
    }

    // Skip git repos not hosted on Github
    if (!url.includes('github.com')) {
      continue;
    }

    url = URL.parse(url).pathname;
    if (url[0] === '/') {
      url = url.substr(1);
    }
    if (url.substr(-4) === '.git') {
      url = url.substr(0, url.length - 4);
    }
    repos.push(url.toLowerCase());
  }

  return repos;
};
