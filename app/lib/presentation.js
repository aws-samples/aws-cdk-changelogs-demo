var Changelogs = require(process.cwd() + '/lib/changelog');
var marked = require('marked');
var highlight = require('highlight.js');
var fs = require('fs');
var _ = require('lodash');
var AWS = require('aws-sdk');
var S3 = new AWS.S3();

// The presentation layer. This is the code which generates and saves the
// API responses and HTML pages that are the public facing interface of this
// service
function Presentation() {
  // Build a custom markdown renderer. This lets us clean up the changelogs a bit
  this.renderer = new marked.Renderer();

  // Force all heading inside the changelog version descriptions to be h4.
  // Prevents giant headings from ruining the look of the page.
  this.renderer.heading = function(text) {
    return '<h4>' + text + '</h4>';
  };

  // Ignore all horizontal rules in the changelog bodies.
  this.renderer.hr = function() {
    return '';
  };

  // Ignore inline HTML, to avoid XSS
  this.renderer.html = function() {
    return '';
  };

  marked.setOptions({
    sanitize: false,
    renderer: this.renderer,
    highlight: function(code) {
      return highlight.highlightAuto(code).value;
    }
  });

  this.rawTemplates = {
    changelog: fs.readFileSync('./static/changelog.html'),
    homepage: fs.readFileSync('./static/index.html')
  };
  this.templates = {
    changelog: _.template(this.rawTemplates.changelog),
    homepage: _.template(this.rawTemplates.homepage)
  };

  this.months = [
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

  this.API_BUCKET_NAME = process.env.API_BUCKET_NAME || 'API bucket name not set';
  this.WEB_BUCKET_NAME = process.env.WEB_BUCKET_NAME || 'Web bucket name not set';
}
module.exports = new Presentation();

/**
  * Render the changelog into a JSON document and store it in the S3 bucket
**/
Presentation.prototype.saveApiResponse = async function(repoName, changelog) {
  return await S3.putObject({
    Bucket: this.API_BUCKET_NAME,
    Key: 'api/github/' + repoName + '/index.json',
    Body: JSON.stringify(changelog),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }).promise();
};

/**
  * Render the feed of recently crawled changelogs into a JSON document and store in the S3 bucket
**/
Presentation.prototype.saveRecentlyCrawled = async function(recentlyCrawled) {
  return await S3.putObject({
    Bucket: this.API_BUCKET_NAME,
    Key: 'api/recently-crawled/index.json',
    Body: JSON.stringify(recentlyCrawled),
    ContentType: 'application/json',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }).promise();
};

/**
  * Render an HTML page representing a changelog and store it in the S3 bucket
**/
Presentation.prototype.saveWebPage = async function(repoName, changelog) {
  var self = this;

  var html = this.templates.changelog({
    apiUrl: changelog.href,
    repoUrl: changelog.repo,
    changelogSource: changelog.changelog,
    repoName: repoName,
    versions: changelog.contents.map(function(version) {
      var dateString = '';

      if (version.date) {
        var versionDate = new Date(version.date);
        dateString = self.months[versionDate.getMonth()] + ' ' +
                     versionDate.getDate() + ', ' +
                     versionDate.getFullYear();
      }

      var versionBody = marked(version.body);

      return {
        version: version.version,
        date: dateString,
        body: versionBody
      };
    })
  });

  return await S3.putObject({
    Bucket: this.WEB_BUCKET_NAME,
    Key: 'github/' + repoName + '/index.html',
    Body: html,
    ContentType: 'text/html',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }).promise();
};

/**
  * Regenerate the homepage and save it to the web S3 bucket
**/
Presentation.prototype.regenerateHomePage = async function() {
  // Get the list of recently crawled changelogs
  var feed = await Changelogs.recentlyUpdated();

  // Fetch the metadata for each one
  var changelogs = _.uniq(_.map(feed, 'repo'));
  var metadata = await Changelogs.bulkGetMetadata(changelogs);

  // Ensure that the metadata is sorted by crawl order again
  // since DynamoDB returns the bulk get results in random order.
  metadata = _.sortBy(metadata, 'crawledAt').reverse();

  var html = this.templates.homepage({
    feed: metadata
  });

  return await S3.putObject({
    Bucket: this.WEB_BUCKET_NAME,
    Key: 'index.html',
    Body: html,
    ContentType: 'text/html',
    ACL: 'public-read',
    CacheControl: 'public, max-age=60'
  }).promise();
};
