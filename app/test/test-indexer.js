const Indexer = require(process.cwd() + '/lib/indexer');

describe.skip('Indexing', function() {
  it('should be able index a one word module name', function() {
    Indexer.addToIndex('express');
  });

  it('should be able index module name with dashes', function() {
    Indexer.addToIndex('s3-upload-stream');
  });

  it('should be able index module name with slashes', function() {
    Indexer.addToIndex('@use-hook/use-cookie');
  });

  it('should be able index a module name with number delimiter', function() {
    Indexer.addToIndex('svg2others');
  });
});
