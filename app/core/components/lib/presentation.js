import { marked } from 'marked';
import highlight from 'highlight.js';
import fs from 'fs';
import _ from 'lodash';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
var S3 = new S3Client();

// Build a custom markdown renderer. This lets us clean up the changelogs a bit
var renderer = new marked.Renderer();

// Force all heading inside the changelog version descriptions to be h4.
// Prevents giant headings from ruining the look of the page.
renderer.heading = function (text) {
  return '<h4>' + text + '</h4>';
};

// Ignore all horizontal rules in the changelog bodies.
renderer.hr = function () {
  return '';
};

// Ignore inline HTML, to avoid XSS
renderer.html = function () {
  return '';
};

marked.setOptions({
  sanitize: false,
  renderer: renderer,
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});

var rawTemplates = {
  changelog: fs.readFileSync(process.cwd() + '/templates/changelog.html'),
  homepage: fs.readFileSync(process.cwd() + '/templates/index.html')
};
var templates = {
  changelog: _.template(rawTemplates.changelog),
  homepage: _.template(rawTemplates.homepage)
};

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const API_BUCKET_NAME = process.env.API_BUCKET_NAME || 'API bucket name not set';
const WEB_BUCKET_NAME = process.env.WEB_BUCKET_NAME || 'Web bucket name not set';

import * as Changelogs from './changelog.js';

/**
  * Render the changelog into a JSON document and store it in the S3 bucket
**/
export const saveApiResponse = async function (repoName, changelog) {
  return await S3.send(new PutObjectCommand({
    Bucket: API_BUCKET_NAME,
    Key: 'api/github/' + repoName + '/index.json',
    Body: JSON.stringify(changelog),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }));
};

/**
  * Render the feed of recently crawled changelogs into a JSON document and store in the S3 bucket
**/
export const saveRecentlyCrawled = async function (recentlyCrawled) {
  return await S3.send(new PutObjectCommand({
    Bucket: API_BUCKET_NAME,
    Key: 'api/recently-crawled/index.json',
    Body: JSON.stringify(recentlyCrawled),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }));
};

/**
  * Render an HTML page representing a changelog and store it in the S3 bucket
**/
export const saveWebPage = async function (repoName, changelog) {
  var html = templates.changelog({
    apiUrl: changelog.href,
    repoUrl: changelog.repo,
    changelogSource: changelog.changelog,
    repoName: repoName,
    versions: changelog.contents.map(function (version) {
      var dateString = '';

      if (version.date) {
        var versionDate = new Date(version.date);
        dateString = months[versionDate.getMonth()] + ' ' +
          versionDate.getDate() + ', ' +
          versionDate.getFullYear();
      }

      var versionBody = marked.parse(version.body);

      return {
        version: version.version,
        date: dateString,
        body: versionBody
      };
    })
  });

  return await S3.send(new PutObjectCommand({
    Bucket: WEB_BUCKET_NAME,
    Key: 'github/' + repoName + '/index.html',
    Body: html,
    ContentType: 'text/html',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }));
};

/**
  * Regenerate the homepage and save it to the web S3 bucket
**/
export const regenerateHomePage = async function () {
  // Get the list of recently crawled changelogs
  var feed = await Changelogs.recentlyUpdated();

  // Fetch the metadata for each one
  var changelogs = _.uniq(_.map(feed, 'repo'));
  var metadata = await Changelogs.bulkGetMetadata(changelogs);

  // Ensure that the metadata is sorted by crawl order again
  // since DynamoDB returns the bulk get results in random order.
  metadata = _.sortBy(metadata, 'crawledAt').reverse();

  var html = templates.homepage({
    feed: metadata
  });

  return await S3.send(new PutObjectCommand({
    Bucket: WEB_BUCKET_NAME,
    Key: 'index.html',
    Body: html,
    ContentType: 'text/html',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }));
};
