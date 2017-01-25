const Joi = require('joi');
const Boom = require('boom');
const resourcesDir = __dirname + '/../../resources/';
const parliaments = require(resourcesDir + 'data/parliaments.js');

module.exports = {
  method: 'GET',
  path: '/data/parties',
  config: {
    validate: {
      query: {
        parliament: Joi.string().valid(Object.keys(parliaments))
      }
    }
  },
  handler: function(request, reply) {
    let parliamentName = request.query.parliament;
    let parliament = parliaments[parliamentName];
    if (parliament !== undefined && parliament.parties !== undefined) {
      return reply(parliament.parties);
    } else {
      return reply(Boom.notFound());
    }
  }
}
