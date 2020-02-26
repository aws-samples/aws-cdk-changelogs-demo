var Crawl = require(process.cwd() + '/lib/crawl');

describe.only('The changelog crawler', function() {
  it('should be able to find changelog in repo', async function() {
    var results = await Crawl.locateChangelogInRepo('aws/aws-cdk');

    console.log(results);
  });
});
