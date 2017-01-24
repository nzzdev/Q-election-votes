const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/data/parliaments',
  handler: function(request, reply) {
    if (process.env.PARLIAMENTS === undefined) {
      return reply(Boom.notFound());
    } else {
      let parliaments = JSON.parse(process.env.PARLIAMENTS).parliaments;
      return reply(Object.keys(parliaments));
    }
  }
}
