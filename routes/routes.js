const htmlStatic = require('./rendering-info/html-static.js');
const stylesheet = require('./stylesheet.js');
const schema = require('./schema.js');
const parliaments = require('./data/parliaments.js');
const parties = require('./data/parties.js');

module.exports = [
  htmlStatic,
  stylesheet,
  schema,
  parliaments,
  parties
]
