import got from 'got';
import URL from 'url';
import _ from 'lodash';

const httpOptions = {
  headers: {
    'User-Agent': 'changelogs.md'
  }
};

import * as Changelog from './changelog.js';

/**
  * Fetch the list of recently released gems from RubyGems
**/
export const fetchRecentPackages = async function () {
  try {
    var response = await got('https://rubygems.org/api/v1/activity/just_updated.json', httpOptions);
  } catch (e) {
    console.error('Failed to fetch https://rubygems.org/api/v1/activity/just_updated.json\n', response);
    return;
  }

  var recentList;

  try {
    recentList = JSON.parse(response.body);
  } catch (e) {
    console.error('Failed to parse list of recent Ruby gems: ', response.body);
  }

  return recentList;
};

/**
  * Extract the Github repos for each gem in a list
**/
export const packageListToRepos = function (packageList) {
  // Fetch the basic top level links
  var links = [];

  // Extract all the relevant links from the list of packages.
  for (var packageRef of packageList) {
    if (packageRef.source_code_uri) {
      links.push(packageRef.source_code_uri.toLowerCase());
    }

    if (packageRef.homepage_uri) {
      links.push(packageRef.homepage_uri.toLowerCase());
    }
  }

  // Filter out links that don't contain github.com
  links = links.filter(function (link) {
    return link.includes('github.com');
  });

  var urlPieces;
  var repos = [];
  for (var url of links) {
    url = URL.parse(url).pathname;
    if (url[0] === '/') {
      url = url.substr(1);
    }

    urlPieces = url.split('/');
    repos.push(urlPieces[0] + '/' + urlPieces[1]);
  }

  return _.uniq(repos);
};

/**
  * Entry point. Fetch the list of recent packages from Ruby Gems, find the
  * github repos referenced from them, and upsert them for crawling
**/
export const upsertRecentPackageRepos = async function () {
  var packageList = await fetchRecentPackages();

  var repos = packageListToRepos(packageList);

  console.log(`RUBY - Found ${repos.length} repos`);

  await Changelog.upsert(repos);
};
