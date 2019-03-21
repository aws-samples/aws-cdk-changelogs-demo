const Schedule = require(process.cwd() + '/lib/schedule');

describe('Scheduling', function() {
  it('should be able schedule a changelog', function() {
    Schedule.scheduleCrawl('expressjs/express');
  });
});
