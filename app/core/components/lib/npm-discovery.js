import got from 'got';
import URL from 'url';

const httpOptions = {
  headers: {
    'User-Agent': 'changelogs.md'
  }
};

/**
  * Fetch the details of a package from NPM
**/
export const packageNameToDetails = async function (packageName) {
  var subpath = packageName + '/latest';

  try {
    var response = await got(`https://registry.npmjs.org/${subpath}`, httpOptions);
  } catch (e) {
    console.error(`Failed to find package: https://registry.npmjs.org/${subpath}: ${e.error}`);
    return;
  }

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
export const packageNamesToRepos = async function (packageList) {
  var promisePackageInfo = [];
  var packageInfo = [];

  for (var packageName of packageList) {
    promisePackageInfo.push(packageNameToDetails(packageName));
  }

  packageInfo = await Promise.all(promisePackageInfo);

  // For each package details get the Github repo for that package.
  var repos = [];
  for (var i = 0; i < packageInfo.length; i++) {
    // Skip over packages that failed to fetch from the NPM registry
    if (!packageInfo[i]) {
      continue;
    }

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

    if (!url) {
      console.log(`issues parsing: ${packageInfo[i].repository.url}`);
      continue;
    }

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
