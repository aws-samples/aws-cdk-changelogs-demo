var fs = require('fs');
var expect = require('chai').expect;
var Parser = require(process.cwd() + '/lib/parser');
var _ = require('lodash');

describe.only('The changelog parser', function() {
  it('Should ignore inline semver versions when finding version boundaries', function() {
    var changelog = fs.readFileSync('./test/changelogs/expressjs-express.md');
    var results = Parser.parse(changelog);
    expect(results).to.have.length(14);
    expect(_.map(results, 'version')).to.eql([
      '4.14.0',
      '4.13.4',
      '4.13.3',
      '4.13.2',
      '4.13.1',
      '4.13.0',
      '4.12.4',
      '4.12.3',
      '4.12.2',
      '4.12.1',
      '4.12.0',
      '4.11.2',
      '4.11.1',
      '4.11.0'
    ]);
  });

  it('No intro, no dates, just versions', function() {
    var changelog = fs.readFileSync('./test/changelogs/atom-haskell_haskell-ghc-mod.md');
    var results = Parser.parse(changelog);
    expect(results).to.have.length(4);
    expect(results[0].version).to.equal('1.17.2');
    expect(results[1].version).to.equal('1.17.1');
    expect(results[2].version).to.equal('1.17.0');
    expect(results[3].version).to.equal('1.16.1');
  });

  it('Intro, dates, and versions', function() {
    var changelog = fs.readFileSync('./test/changelogs/node_redis.md');
    var results = Parser.parse(changelog);
    expect(results).to.have.length(3);
    expect(results[0].version).to.equal('2.6.2');
    expect(results[0].date.toJSON()).to.equal('2016-06-16T04:00:00.000Z');
    expect(results[1].version).to.equal('2.6.1');
    expect(results[1].date.toJSON()).to.equal('2016-06-02T04:00:00.000Z');
    expect(results[2].version).to.equal('2.6.0');
    expect(results[2].date.toJSON()).to.equal('2016-06-01T04:00:00.000Z');
  });

  it('Should not misread version numbers in links, and should handle dates properly', function() {
    var changelog = fs.readFileSync('./test/changelogs/yargs_yargs.md');
    var results = Parser.parse(changelog);
    expect(results).to.have.length(3);
    expect(results[0].version).to.equal('5.0.0');
    expect(results[0].date.toJSON()).to.equal('2016-08-14T04:00:00.000Z');
    expect(results[1].version).to.equal('4.8.1');
    expect(results[1].date.toJSON()).to.equal('2016-07-16T04:00:00.000Z');
    expect(results[2].version).to.equal('4.8.0');
    expect(results[2].date.toJSON()).to.equal('2016-07-09T04:00:00.000Z');
  });

  it('Should handle random version numbers that only have two components', function() {
    var changelog = fs.readFileSync('./test/changelogs/postcss.md');
    var results = Parser.parse(changelog);
    expect(results[1].version).to.equal('5.1.1');
    expect(results[1].date).to.equal(null);
    expect(results[2].version).to.equal('5.1.0'); // Should turn number into proper semver
    expect(results[2].date).to.equal(null);
    expect(results[3].version).to.equal('5.0.21');
    expect(results[3].date).to.equal(null);
  });

  it('Should parse body properly when body is one line below header', function() {
    var changelog = fs.readFileSync('./test/changelogs/itsa-react-editor.md');
    var results = Parser.parse(changelog);
    expect(results[0].version).to.equal('15.2.10');
    expect(results[0].date).to.equal(null);
    expect(results[0].body).to.equal('Updated dependencies');
    expect(results[1].version).to.equal('15.2.8');
    expect(results[1].date).to.equal(null);
    expect(results[1].body).to.equal('Better fix for serverside rendering patch to prevent `window.jQuery` error');
    expect(results[2].version).to.equal('15.2.4');
    expect(results[2].date).to.equal(null);
    expect(results[2].body).to.equal('Updated dev-dependencies');
  });

  it('Should parse version header that is missing the underline by accident', function() {
    var changelog = fs.readFileSync('./test/changelogs/koajs-mount.md');
    var results = Parser.parse(changelog);
    expect(results[0].version).to.equal('1.3.0');
    expect(results[0].date.toJSON()).to.equal('2014-05-08T04:00:00.000Z');
    expect(results[1].version).to.equal('1.2.5');
    expect(results[1].date.toJSON()).to.equal('2014-03-25T04:00:00.000Z');
    expect(results[2].version).to.equal('1.2.4');
    expect(results[2].date.toJSON()).to.equal('2014-03-15T04:00:00.000Z');
  });

  it('Should not confuse inline version numbers with github issue links as version headers', function() {
    var changelog = fs.readFileSync('./test/changelogs/makojs_cssnext.md');
    var results = Parser.parse(changelog);
    expect(results[0].version).to.equal('0.7.0');
    expect(results[0].date.toJSON()).to.equal('2016-09-05T04:00:00.000Z');
    expect(results[1].version).to.equal('0.6.5');
    expect(results[1].date.toJSON()).to.equal('2016-08-31T04:00:00.000Z');
    expect(results[2].version).to.equal('0.6.4');
    expect(results[2].date.toJSON()).to.equal('2016-06-29T04:00:00.000Z');
    expect(results[3].version).to.equal('0.6.3');
    expect(results[3].date.toJSON()).to.equal('2016-06-27T04:00:00.000Z');
  });

  /*it('Should get timestamps in MM-DD-YYYY format too', function() {
    var changelog = fs.readFileSync('./test/changelogs/stamplay.md');
    var results = Parser.parse(changelog);
    console.log(results);
    // Tricky one, holding off on it for now.
  });*/

  it('Should discard the contents of links so it doesn\'t confuse dates or version numbers', function() {
    var changelog = fs.readFileSync('./test/changelogs/node-archiver.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('1.1.0');
    expect(results[0].date.toJSON()).to.equal('2016-08-29T04:00:00.000Z');
    expect(results[1].version).to.equal('1.0.1');
    expect(results[1].date.toJSON()).to.equal('2016-07-27T04:00:00.000Z');
    expect(results[2].version).to.equal('1.0.0');
    expect(results[2].date.toJSON()).to.equal('2016-04-05T04:00:00.000Z');
    expect(results[3].version).to.equal('0.21.0');
    expect(results[3].date.toJSON()).to.equal('2015-12-21T05:00:00.000Z');
    expect(results[4].version).to.equal('0.20.0');
    expect(results[4].date.toJSON()).to.equal('2015-11-30T05:00:00.000Z');
  });

  it('Should handle underline headers with no dates reasonably well', function() {
    var changelog = fs.readFileSync('./test/changelogs/pegjs.md');
    var results = Parser.parse(changelog);
    expect(results[0].version).to.equal('0.5.1');
    expect(results[1].version).to.equal('0.5.0');
    expect(results[2].version).to.equal('0.4.0');
  });

  it('Should match dates that have no comma', function() {
    var changelog = fs.readFileSync('./test/changelogs/brunch.md');
    var results = Parser.parse(changelog);
    expect(results[0].version).to.equal('2.0.0');
    expect(results[0].date.toJSON()).to.equal('2016-01-29T05:00:00.000Z');
    expect(results[1].version).to.equal('1.8.1');
    expect(results[1].date.toJSON()).to.equal('2015-01-12T05:00:00.000Z');
    expect(results[2].version).to.equal('1.8.0');
    expect(results[2].date.toJSON()).to.equal('2015-01-11T05:00:00.000Z');
    expect(results[3].version).to.equal('1.7.2');
    expect(results[3].date.toJSON()).to.equal('2014-02-26T05:00:00.000Z');
    expect(results[4].version).to.equal('1.7.1');
    expect(results[4].date.toJSON()).to.equal('2013-12-09T05:00:00.000Z');
  });

  it('Should support versions that have alpha/beta tags', function() {
    var changelog = fs.readFileSync('./test/changelogs/jpeer264-toastr.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('3.0.0-alpha.8');
    expect(results[0].date.toJSON()).to.equal('2019-02-24T05:00:00.000Z');
    expect(results[1].version).to.equal('3.0.0-alpha.7');
    expect(results[1].date.toJSON()).to.equal('2019-02-01T05:00:00.000Z');
  });

  it('Should handle date first and strange date format', function() {
    var changelog = fs.readFileSync('./test/changelogs/cordova-template.md');
    var results = Parser.parse(changelog);

    // This sample has a super messed up date format so don't
    // expect anything in terms of date
    expect(results[0].version).to.equal('1.2.1');
    expect(results[1].version).to.equal('1.2.0');
  });

  it('Should filter out the "semantically-released" ad', function() {
    var changelog = fs.readFileSync('./test/changelogs/semantically-released.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('1.0.12');
    expect(results[0].date.toJSON()).to.equal('2016-09-06T04:00:00.000Z');
  });

  it('Should sort versions in descending order', function() {
    var changelog = fs.readFileSync('./test/changelogs/wtf-wikipedia.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('8.0.0');
    expect(results[1].version).to.equal('7.2.10');
  });

  it('Should filter out versions that might otherwise be seen as dates', function() {
    var changelog = fs.readFileSync('./test/changelogs/ember-lifeline.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('4.1.0');
    expect(results[0].date.toJSON()).to.equal('2019-03-08T05:00:00.000Z');
    expect(results[1].version).to.equal('4.0.0');
    expect(results[1].date.toJSON()).to.equal('2019-03-04T05:00:00.000Z');
    expect(results[2].version).to.equal('3.1.0');
    expect(results[2].date.toJSON()).to.equal('2018-12-21T05:00:00.000Z');
  });

  it('Should not pick up a weird 1998 date', function() {
    var changelog = fs.readFileSync('./test/changelogs/tsqlint.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('1.11.1');
    expect(results[0].date.toJSON()).to.equal('2018-06-14T04:00:00.000Z');
    expect(results[1].version).to.equal('1.11.0');
    expect(results[1].date.toJSON()).to.equal('2018-05-14T04:00:00.000Z');
    expect(results[2].version).to.equal('1.10.1');
    expect(results[2].date.toJSON()).to.equal('2018-04-14T04:00:00.000Z');
  });

  it('Should filter out HTML comments that would not show up in the changelog anyway', function() {
    var changelog = fs.readFileSync('./test/changelogs/bait-comment.md');
    var results = Parser.parse(changelog);

    expect(results[0].version).to.equal('0.14.127');
    expect(results[1].version).to.equal('0.14.124');
  });
});
