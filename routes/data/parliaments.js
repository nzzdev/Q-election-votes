const Boom = require('boom');
const resourcesDir = __dirname + '/../../resources/';
const parliaments = require(resourcesDir + 'data/parliaments.js');

module.exports = {
  method: 'GET',
  path: '/data/parliaments',
  handler: function(request, reply) {
    return reply(Object.keys(parliaments));
  }
}
