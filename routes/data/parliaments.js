const parliaments = JSON.parse(process.env.PARLIAMENTS).parliaments;

module.exports = {
  method: 'GET',
  path: '/data/parliaments',
  handler: function(request, reply) {
    return reply(Object.keys(parliaments));
  }
}
