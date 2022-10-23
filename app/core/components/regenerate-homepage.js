import * as Presentation from './lib/presentation.js';

var CHECK_INTERVAL = 30 * 1000;

async function regenerateHomePage() {
  console.log('WEB - Regenerating homepage');
  await Presentation.regenerateHomePage();
  setTimeout(regenerateHomePage, CHECK_INTERVAL);
}

regenerateHomePage();