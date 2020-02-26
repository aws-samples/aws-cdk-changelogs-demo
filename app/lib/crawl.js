const { Octokit } = require("@octokit/rest")
const { createTokenAuth } = require("@octokit/auth-token");
const _ = require('lodash');
const request = require('request-promise-native');

function Crawl() {
  this.githubClient = Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN || 'github access token not set'
  });

  this.request = request.defaults({
    headers: { 'User-Agent': 'changelogs.md' },
    resolveWithFullResponse: true
  });
}
module.exports = new Crawl();

const Changelog = require(process.cwd() + '/lib/changelog');
const Parser = require(process.cwd() + '/lib/parser');

/**
  * If there is a cached URL of the changelog for this repo
  * fetch the changelog using that cached URL if possible
**/
Crawl.prototype.fetchChangelogUsingCachedUrl = async function(repoName) {
  const metadata = await Changelog.getMetadata(repoName);

  if (!metadata || !metadata.sourceUrl) {
    return;
  }

  console.log(`Download cached changelog URL ${metadata.sourceUrl}`);
  var response;
  try {
    response = await this.request(metadata.sourceUrl);
  } catch (e) {
    console.error(`Unable to download cached changelog URL: ${metadata.sourceUrl}`);
    console.error(e);
    return;
  }

  if (response.statusCode !== 200) {
    return;
  }

  console.log(`Found cached changelog metadata in DynamoDB for ${repoName}`);

  return {
    url: metadata.sourceUrl,
    body: response.body
  };
};

/**
  * We have a repo name, but we need to find the changelog in the repo.
  * This can be tricky because not everyone uses the same filenames and
  * name format
**/
Crawl.prototype.locateChangelogInRepo = async function(repoName) {
  var tokens = repoName.split('/');
  const owner = tokens[0];
  const repo = tokens[1];

  // Ask github API for the contents of the root of the repo
  var contents;

  try {
    contents = await this.githubClient.repos.getContents({
      owner: owner,
      repo: repo,
      path: ''
    });
  } catch (e) {
    console.error(`Failed to find repo contents ${owner}/${repo}`);
    console.error(e);
    return;
  }

  if (contents.status === 404) {
    // Repo doesn't exist or can't get contents for it.
    return;
  } else if (contents.status !== 200) {
    console.error(contents);
    return;
  }

  contents = contents.data;

  var file;
  for (var i in contents) {
    file = contents[i];

    if (file.type !== 'file') {
      continue;
    }

    var lowercase = file.name.toLowerCase();
    var split = lowercase.split('.');
    var name = split[0];
    var extension = split[split.length - 1];

    if (// File name
        (name === 'changelog' ||
         name === 'news' ||
         name === 'history' ||
         name === 'releases') &&

        // File extension
        (extension === undefined ||
         extension === 'md' ||
         extension === 'mkd' ||
         extension === 'markdown')) {
      return file['download_url'];
    }
  }

  return;
};

/**
  * Repo changelog contents
**/
Crawl.prototype.repoContents = async function(repoName) {
  console.log(`Checking for cached changelog details for ${repoName}`);
  var cachedResults = await this.fetchChangelogUsingCachedUrl(repoName);

  if (cachedResults) {
    return cachedResults;
  }

  console.log(`Discovering changelog from scratch for ${repoName}`);
  const url = await this.locateChangelogInRepo(repoName);

  if (!url) {
    console.log(`No changelog found in ${repoName}`);
    return;
  }

  console.log(`Download discovered changelog ${url}`);
  var resp;
  try {
    resp = await this.request(url);
  } catch (e) {
    console.error(`Unable to download changelog: ${url}`);
    console.error(e);
    return;
  }

  if (resp.statusCode !== 200) {
    console.error(`Unable to download changelog: ${url} \n Got status code: ${resp.statusCode}`);
    return;
  }

  return {
    url: url,
    body: resp.body
  };
};

/**
  * Entrypoint that orchestrates the crawl
**/
Crawl.prototype.crawlRepo = async function(repoName) {
  var repoContents = await this.repoContents(repoName);

  if (!repoContents) {
    console.log(`Rejecting ${repoName} for not being able to access repo contents`);
    await Changelog.reject(repoName);
    return;
  }

  var items = Parser.parse(repoContents.body);

  // Check if the changelog is empty
  if (items.length === 0) {
    console.log(`Rejecting ${repoName} for empty changelog`);
    await Changelog.reject(repoName);
    return;
  }

  var version = items[0].version;
  var date;

  if (items[0].date) {
    date = items[0].date.getTime();
  } else {
    date = 0;
  }

  // Mark the repo as recently crawled.
  await Changelog.crawled(repoName, {
    version: version,
    date: date,
    url: repoContents.url
  });

  return {
    crawledAt: new Date(),
    href: '/api/github/' + repoName,
    repo: 'https://github.com/' + repoName,
    changelog: repoContents.url,
    contents: items
  };
};

/**
  * Entrypoint that orchestrates a recrawl
**/
Crawl.prototype.recrawl = async function() {
  var outdated = await Changelog.scanForOutdatedChangelogs();

  if (outdated.length === 0) {
    console.log('No outdated changelogs to recrawl');
    return;
  }

  // Select a random sample of 3% or 10, whichever is greater
  var numberToCrawl = outdated.length * .01;

  if (numberToCrawl < 10) {
    numberToCrawl = 10;
  }

  if (numberToCrawl > 100) {
    numberToCrawl = 100;
  }

  var toRecrawl = _.sampleSize(outdated, numberToCrawl);

  console.log('Recrawling', toRecrawl);

  await Changelog.upsert(toRecrawl);
};
