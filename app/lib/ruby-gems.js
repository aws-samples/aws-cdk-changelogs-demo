const request = require('request-promise-native');
const URL = require('url');
const _ = require('lodash');

var RubyGems = function() {
  this.request = request.defaults({
    headers: { 'User-Agent': 'changelogs.md' },
    resolveWithFullResponse: true
  });
};
module.exports = new RubyGems();

const Changelog = require(process.cwd() + '/lib/changelog');

/**
  * Fetch the list of recently released gems from RubyGems
**/
RubyGems.prototype.fetchRecentPackages = async function() {
  var response = await this.request('https://rubygems.org/api/v1/activity/just_updated.json');

  if (response.statusCode !== 200) {
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
RubyGems.prototype.packageListToRepos = function(packageList) {
  // Fetch the basic top level links
  var links = [];

  // Extract all the relevant links from the list of packages.
  for (var package of packageList) {
    if (package.source_code_uri) {
      links.push(package.source_code_uri.toLowerCase());
    }

    if (package.homepage_uri) {
      links.push(package.homepage_uri.toLowerCase());
    }
  }

  // Filter out links that don't contain github.com
  links = links.filter(function(link) {
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
RubyGems.prototype.upsertRecentPackageRepos = async function() {
  var packageList = await this.fetchRecentPackages();

  var repos = this.packageListToRepos(packageList);

  await Changelog.upsert(repos);
};
