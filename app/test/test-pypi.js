const PyPI = require(process.cwd() + '/lib/pypi');
var expect = require('chai').expect;

describe.only('PyPI', function() {
  var rawXML;
  var packageNames;

  it('should be able to fetch raw XML of recent packages feed', async function() {
    this.timeout(10000);
    rawXML = await PyPI.fetchXMLFromPyPI();
    expect(rawXML).to.be.a('string');
  });

  it('should be able to parse package names out of the XML', async function() {
    packageNames = PyPI.parsePackageNamesFromXML(rawXML);

    expect(packageNames).to.be.an('array');
    expect(packageNames.length).to.be.greaterThan(0);
  });

  it('should be able to fetch the Github for a package', async function() {
    this.timeout(10000);
    var packageRepo = await PyPI.packageNameToRepo('cognite-sdk');
    expect(packageRepo).to.equal('cognitedata/cognite-sdk-python');
  });

  it.skip('should upsert recent packages from the entry point', async function() {
    this.timeout(10000);

    await PyPI.upsertRecentPackageRepos();
  });
});
