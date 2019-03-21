var Presentation = require(process.cwd() + '/lib/presentation');

// Handler that triggers the homepage regeneration once
// a minute.
exports.handle = async function() {
  await Presentation.regenerateHomePage();
};
