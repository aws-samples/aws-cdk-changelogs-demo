const request = require('request-promise-native');
const cheerio = require('cheerio');
const URL = require('url');
const _ = require('lodash');

var PyPI = function () {
  this.request = request.defaults({
    headers: { 'User-Agent': 'changelogs.md' },
    resolveWithFullResponse: true
  });
};
module.exports = new PyPI();

const Changelog = require(process.cwd() + '/components/lib/changelog');

/**
  * Fetch the list of recently released packages from PyPI
**/
PyPI.prototype.fetchXMLFromPyPI = async function () {
  var response = await this.request('https://pypi.org/rss/updates.xml');

  if (response.statusCode !== 200) {
    console.error('Failed to fetch https://pypi.org/rss/updates.xml\n', response);
    return;
  }

  return response.body;
};

/**
  * Takes plaintext XML and turns it into a list of the package names in that XML
**/
PyPI.prototype.parsePackageNamesFromXML = function (xml) {
  var $ = cheerio.load(xml, { xmlMode: true });
  var packageNames = [];

  // Loop through all links found in the document
  $('item link').each(function () {
    var packageLink = $(this).text();

    // Remove the prefix and get just the package name
    packageLink = packageLink.replace('https://pypi.org/project/', '');
    packageLink = packageLink.split('/');
    packageNames.push(packageLink[0]);
  });

  return packageNames;
};

/**
  * Fetch the details of a package from PyPI
**/
PyPI.prototype.packageNameToRepo = async function (packageName) {
  var response = await this.request(`https://pypi.org/pypi/${packageName}/json`);

  if (response.statusCode !== 200) {
    console.error(`PYPI - Failed to fetch https://pypi.org/pypi/${packageName}/json\n`, response);
    return;
  }

  var packageDetails;
  try {
    packageDetails = JSON.parse(response.body);
  } catch (e) {
    console.error(`PYPI - Failed to parse https://pypi.org/pypi/${packageName}/json\n`, response.body);
    return;
  }

  // Fetch the basic top level links
  var links = [
    packageDetails.info.download_url,
    packageDetails.info.home_page
  ];

  // Fetch the lower level custom links for the project as well
  for (var link in packageDetails.info.project_urls) {
    links.push(packageDetails.info.project_urls[link]);
  }

  // Now find the first Github link and fetch the repo name
  var repoName, urlPieces;
  for (var url of links) {
    if (!url) {
      continue;
    }

    url = url.toLowerCase();

    // Skip links not hosted on Github
    if (!url.includes('github.com')) {
      continue;
    }

    url = URL.parse(url).pathname;
    if (url[0] === '/') {
      url = url.substr(1);
    }

    urlPieces = url.split('/');
    repoName = urlPieces[0] + '/' + urlPieces[1];
    break;
  }

  return repoName;
};

/**
  * The entry point, fetch a list of recent packages from PyPI, look up
  * metadata for each package to find the Github repo, upsert the repo for
  * crawling.
**/
PyPI.prototype.upsertRecentPackageRepos = async function () {
  var xml = await this.fetchXMLFromPyPI();

  var packages = await this.parsePackageNamesFromXML(xml);

  var packageRepoPromises = [];
  for (var package of packages) {
    packageRepoPromises.push(this.packageNameToRepo(package));
  }

  var packageRepos = await Promise.all(packageRepoPromises);

  // Filter out the packages for which we found no Github repo
  packageRepos = packageRepos.filter(function (repo) {
    return repo !== undefined;
  });
  packageRepos = _.uniq(packageRepos);

  console.log(`PYPI - Found ${packageRepos.length} repos to check`);

  // Upsert all these discovered repos
  await Changelog.upsert(packageRepos);
};
