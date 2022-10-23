import got from 'got';
import URL from 'url';
import cheerio from 'cheerio';
import _ from 'lodash';

const httpOptions = {
  headers: {
    'User-Agent': 'changelogs.md'
  }
};

import * as Changelog from './changelog.js';

/**
  * Fetch the list of recently released packages from PyPI
**/
export const fetchXMLFromPyPI = async function () {
  try {
    var response = await got('https://pypi.org/rss/updates.xml', httpOptions);
  } catch (e) {
    console.error('Failed to get https://pypi.org/rss/updates.xml', e);
    return;
  }

  return response.body;
};

/**
  * Takes plaintext XML and turns it into a list of the package names in that XML
**/
export const parsePackageNamesFromXML = function (xml) {
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
export const packageNameToRepo = async function (packageName) {
  try {
    var response = await got(`https://pypi.org/pypi/${packageName}/json`, httpOptions);
  } catch (e) {
    if (e.response.statusCode !== 200) {
      console.error(`PYPI - Failed to fetch https://pypi.org/pypi/${packageName}/json\n`, response);
      return;
    } else {
      console.error(`PYPI - Failed to fetch package https://pypi.org/pypi/${packageName}/json because of `, e);
    }
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
export const upsertRecentPackageRepos = async function () {
  var xml = await fetchXMLFromPyPI();

  var packages = await parsePackageNamesFromXML(xml);

  var packageRepoPromises = [];
  for (var packageRef of packages) {
    packageRepoPromises.push(packageNameToRepo(packageRef));
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
