const RubyGems = require(process.cwd() + '/lib/ruby-gems');
var expect = require('chai').expect;

describe.skip('Ruby Gems', function() {
  var packageList;

  it('should be able to fetch recent packages feed', async function() {
    this.timeout(10000);
    packageList = await RubyGems.fetchRecentPackages();
    expect(packageList).to.be.an('array');
  });

  it('should be able to extract Github links from packages on the list', function() {
    var links = RubyGems.packageListToRepos(packageList);
    console.log(links);
  });
});
