import pkg from '@octokit/rest';
const { Octokit } = pkg;
import _ from 'lodash';
import got from 'got';

var ONE_DAY = 86400000;
var ONE_MONTH = ONE_DAY * 30;
var ONE_WEEK = ONE_DAY * 7;
var SIX_MONTHS = ONE_MONTH * 6;

var githubClient = Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN || 'github access token not set'
});

const httpOptions = {
  headers: {
    'User-Agent': 'changelogs.md'
  }
};

import * as Changelog from './changelog.js';
import * as Orchestrator from './orchestrator.js';
import * as Parser from './parser.js';

/**
  * If there is a cached URL of the changelog for this repo
  * fetch the changelog using that cached URL if possible
**/
export const fetchChangelogUsingCachedUrl = async function (repoName) {
  const metadata = await Changelog.getMetadata(repoName);

  if (!metadata || !metadata.sourceUrl) {
    return;
  }

  console.log(`Download cached changelog URL ${metadata.sourceUrl}`);
  var response;
  try {
    response = await got(metadata.sourceUrl, httpOptions);
  } catch (e) {
    console.error(`Unable to download cached changelog URL: ${metadata.sourceUrl} - ${e.message}`);
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
export const locateChangelogInRepo = async function (repoName) {
  var tokens = repoName.split('/');
  const owner = tokens[0];
  const repo = tokens[1];

  // Ask github API for the contents of the root of the repo
  var contents;

  try {
    contents = await githubClient.repos.getContents({
      owner: owner,
      repo: repo,
      path: ''
    });
  } catch (e) {
    if (e.message == 'Not Found') {
      // The repo itself was not found.
      throw Error('RepoNotFound');
    } else if (e.message == 'This repository is empty.') {
      throw Error('NoChangelogFound');
    }

    console.error(`CRAWL - ${repoName} - Failed to get repo contents. Github: ${e.message}`);
    throw e;
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
export const fetchRepoContents = async function (repoName) {
  console.log(`REPO - ${repoName} - Checking for cached changelog details`);
  var cachedResults = await fetchChangelogUsingCachedUrl(repoName);

  if (cachedResults) {
    return cachedResults;
  }

  console.log(`REPO - ${repoName} - Discovering changelog from scratch`);
  const url = await locateChangelogInRepo(repoName);

  if (!url) {
    console.log(`CRAWL - ${repoName} - No changelog found`);
    throw Error('NoChangelogFound');
    return;
  }

  console.log(`CRAWL - ${repoName} - Download discovered changelog ${url}`);
  var resp;
  try {
    resp = await got(url, httpOptions);
  } catch (e) {
    console.error(`CRAWL - ${repoName} - Unable to download changelog: ${url}`);
    console.error(e);
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
export const crawlRepo = async function (repoName) {
  try {
    var repoContents = await fetchRepoContents(repoName);
  } catch (e) {
    if (e.message == 'RepoNotFound') {
      console.log(`CRAWL - ${repoName} - Rejecting because bad repo URL`);
      await Changelog.rejectForDuration(repoName, SIX_MONTHS);
      return
    } else if (e.message == 'NoChangelogFound') {
      console.log(`CRAWL - ${repoName} - Rejecting because no changelog found`);
      await Changelog.rejectForDuration(repoName, ONE_WEEK);
      return;
    }

    // No rejection for ephemeral errors
    console.error(`CRAWL - ${repoName} - Failed to crawl due to ephemeral error ${e.message}, will retry later`)
    return;
  }

  if (!repoContents) {
    console.log(`CRAWL - ${repoName} - Rejecting because no repo contents`);
    await Changelog.rejectForDuration(repoName, ONE_WEEK);
    return;
  }

  var items = Parser.parse(repoContents.body);

  // Check if the changelog is empty
  if (items.length === 0) {
    console.log(`CRAWL - ${repoName} - Rejecting because changelog empty`);
    await Changelog.rejectForDuration(repoName, ONE_WEEK);
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
export const recrawl = async function (second) {
  var outdated = await Changelog.selectChangelogsToCrawl(second);

  if (outdated.length === 0) {
    return;
  }

  console.log(`RECRAWL - Found ${outdated.length} repos to recrawl`);

  var numberToCrawl = 5;
  var toRecrawl = _.sampleSize(outdated, numberToCrawl);

  console.log('RECRAWL - Recrawling', toRecrawl);

  for (var recrawlRepo of toRecrawl) {
    await Orchestrator.crawlRepo(recrawlRepo);
  }
};
