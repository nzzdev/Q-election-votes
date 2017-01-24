const Joi = require('joi');
const parliaments = JSON.parse(process.env.PARLIAMENTS).parliaments;

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
    let parliament = request.query.parliament;
    return reply(parliaments[parliament].parties);
  }
}
