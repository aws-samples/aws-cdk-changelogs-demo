import _ from 'lodash';
import findVersions from 'find-versions';
import { compareSemVer, parseSemVer } from 'semver-parser';

// Given the raw content of a changelogs.md file return a processed version of
// the changelog that has been split up into versions, with versions and dates
// nicely extracted.

var falsePositives = /(may)|(before)|(to)|(from)|(on)/;
var outsideReasonableTime = 1000 * 60 * 60 * 24 * 365 * 20;
export const isFalsePositive = function (candidate, date) {
  if (candidate.match(falsePositives)) {
    return true;
  }

  if (Math.abs(date.getTime() - new Date().getTime()) > outsideReasonableTime) {
    return true;
  }

  return false;
};

/**
  * Do regex based search for a date in the string
  *
  * @param {string} string
  * @returns {date|null}
**/
var formats = [
  // ISO 8601 dates
  /(\d)+[- \/.](\d)+[- \/.](\d)+/g,
  // USA human format
  /(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december),?\s\d{1,2},?\s\d{4}/gi,
  // European human format
  /\d{1,2}\s(jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december),?\s\d{4}/gi
];
export const dateSearch = function (string) {
  var matches;

  for (var f in formats) {
    matches = string.match(formats[f]);

    if (!matches) {
      continue;
    }

    // Go from the last match back to the first, working on assumption
    // that the date is likely to be the last match.
    for (var i = matches.length - 1; i >= 0; i--) {
      var attempt = new Date(matches[i]);

      if (attempt && !isNaN(attempt.getTime())) {
        return attempt;
      }
    }
  }

  return null;
};

/**
  * Check a set of lines to see if the line in the middle is
  * the header between two versions
  *
  * @param {array} context - An array of 2 lines. Line to be checked the first item
  * @returns {null|object}
**/
var versionNumber = /\d+\.\d+(\.\d+)?/g;
export const extractHeaderInfo = function (context) {
  // Preprocess the target a bit to remove extra whitespace
  // and other characters that can confuse the NLP
  var target = context[0];

  // Remove the href of any link in the line, because many links contain
  // version numbers from tags or branch names which can confuse the parser.
  var links = target.match(/\[([^\]]+)\]\(([^)]+)\)/);
  while (links) {
    target = target.substr(0, links.index) + links[1] + target.substr(links.index + links[0].length);
    links = target.match(/\[([^\]]+)\]\(([^)]+)\)/);
  }

  // Determine the markup weight of the target line.
  var markupWeight;
  if (target.slice(0, 3) === '###') {
    // Check to see if the target line is an h3
    markupWeight = 3;
  } else if (target.slice(0, 2) === '##') {
    // Check to see if the target line is an h2
    markupWeight = 2;
  } else if (target.slice(0, 1) === '#') {
    // Check to see if the target line is an h1
    markupWeight = 1;
  } else {
    // Check to see if the line below the target line is an underline, formed with either
    // the equals sign or the dash symbol.
    if (context[1]) {
      var underlines = (context[1].match(/[=|-]+/g) || []);
      if (underlines && underlines.length) {
        let count = underlines[0].length;
        if (count > context[1].length * 0.8) {
          // Line below is more than 80% =, so probably an underline indicator.
          markupWeight = 1;
        } else {
          // Nothing special about the line below, therefore nothing special about this line.
          markupWeight = 0;
        }
      }
    }
  }

  // Find a version number in the line
  var versions = findVersions(target, { loose: true });

  var version;
  if (_.isArray(versions)) {
    // If the date format is like YYYY.MM.DD then it can result in
    // the date being grabbed as a version number. So loop through the
    // possible versions and reject any in which the major version number
    // is excessively large.
    for (var i in versions) {
      var parsed = parseSemVer(versions[i]);

      // Filter out dates in the format DD.MM.YYYY and YYYY.MM.DD
      // These dates end up looking like version numbers, but their extra
      // large major or patch versions are a good signal that they are
      // actually dates.
      if (parsed.major < 1900 && parsed.patch < 1900) {
        version = versions[i];
        break;
      }
    }
  }

  if (!version) {
    // Don't bother doing a CPU laden bruteforce search for a date if
    // there is no version number.
    return null;
  }

  var dateTarget = target;

  // Remove identified versions from the date search string to prevent them
  // from being falsely interpreted as dates
  var looseVersions = dateTarget.match(versionNumber);
  var v;

  // Filter out the full semantic versions
  for (v of versions) {
    dateTarget = dateTarget.replace(v, '');
  }

  // Also filter out versions like 1.2 which the "loose" parser picks up and then
  // coerces to their correct semver version like 1.2.0
  for (v of looseVersions) {
    dateTarget = dateTarget.replace(v, '');
  }

  // Clean up date formats a bit?
  dateTarget = dateTarget.replace(/ +(?= )/g, '');
  dateTarget = dateTarget.replace(/(\(|\)|\:)/g, '');
  dateTarget = dateTarget.replace(/(\-)/g, '/');
  dateTarget = dateTarget.replace(/(\.)/g, '/');
  dateTarget = dateTarget.replace('now', ''); // The date parser is a little too good ;)
  dateTarget = dateTarget.replace('week', ''); // So we must cripple it a bit

  // Do a brute force search for a date
  //console.log(target);
  //console.log('Found version', version);
  //console.log(dateTarget);
  var date = dateSearch(dateTarget);
  //console.log('Found date', date);

  if ((version && date > 0) || (version && markupWeight > 0)) {
    return {
      version: version,
      date: date
    };
  } else {
    return null;
  }
};

// This function strips out top level HTML comments from the Markdown but leaves
// HTML comments that are inside Markdown code blocks.
export const removeHTMLComments = function (doc) {
  var docLength = doc.length;
  var strippedContent = '';
  var commentDepth = 0;
  var inCodeBlock = false;

  for (var i = 0; i < docLength; i++) {
    if (doc.substr(i, 3) === '```') {
      strippedContent += '```';
      i += 3; // Advance past the start of the multiline code block

      if (inCodeBlock === '```') {
        inCodeBlock = false;
      } else if (inCodeBlock === false) {
        inCodeBlock = '```';
      }
    }

    if (doc[i] === '`') {
      if (inCodeBlock === '`') {
        inCodeBlock = false;
      } else if (inCodeBlock === false) {
        inCodeBlock = '`';
      }
    }

    if (!inCodeBlock && doc.substr(i, 4) === '<!--') {
      i += 4; // Advance to the end of the comment open tag
      commentDepth++;
      continue;
    }

    if (!inCodeBlock && doc.substr(i, 3) === '-->') {
      i += 3; // Advance to the end of the comment close tag
      if (commentDepth > 0) {
        commentDepth--;
      }
    }

    // Not inside an HTML comment
    if (commentDepth === 0) {
      strippedContent += doc[i];
    }
  }

  return strippedContent;
};

export const parse = function (lines) {
  // Preprocess the document to remove top level HTML comments and their content
  lines = removeHTMLComments(lines.toString());

  // Split the markdown into lines
  lines = lines.split('\n');

  // Feed blocks of string lines into the header finder.
  // If a header is found in a sample then break the lines to extract
  // the body, and tag it with the header info.
  let numberOfLines = lines.length;
  let block = [];
  let items = [];
  let currentItem;

  for (var i = 0; i < numberOfLines + 1; i++) {
    block.push(lines[i]);

    if (i > 1) {
      block.shift();
    } else if (i === 0) {
      continue;
    } else if (i === numberOfLines) {
      block.push('');
    }

    try {
      var header = extractHeaderInfo(block);
    } catch (e) {
      console.error(`Failed to extract header from: ${block}`, e);
      continue;
    }

    // Filter out lines that are just markdown underlines
    var count = (block[0].match(/=/g) || []).length;
    if (count > block[0].length * 0.8) {
      continue;
    }

    if (header) {
      if (currentItem) {
        currentItem.body = currentItem.body.trim();
        items.push(currentItem);
      }

      currentItem = header;
      currentItem.body = '';
    } else {
      if (currentItem) {
        currentItem.body += block[0] + '\n';
      }
    }
  }

  if (currentItem) {
    currentItem.body = currentItem.body.trim();
    items.push(currentItem);
  }

  // Post process to remove some junk items.
  var cleanedItems = [];
  for (var v of items) {

    // Some people are using "semantic-release" package which auto inserts
    // a junk version at the top saying that the changelog was generated using
    // that package. Filter this out
    if (v.version === '0.0.0-semantically-released') {
      continue;
    }

    cleanedItems.push(v);
  }

  // Finally sort the releases in descending order. Some changelogs
  // are in ascending order, and that is kind of annoying, prefer consistency.
  cleanedItems.sort(function (a, b) {
    return compareSemVer(b.version, a.version);
  });

  return cleanedItems;
};
