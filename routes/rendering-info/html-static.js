const fs = require('fs');
const Enjoi = require('enjoi');
const Joi = require('joi');
const resourcesDir = __dirname + '/../../resources/';
const viewsDir = __dirname + '/../../views/';

const schemaString = JSON.parse(fs.readFileSync(resourcesDir + 'schema.json', {
  encoding: 'utf-8'
}));
const schema = Enjoi(schemaString);

require('svelte/ssr/register');
const staticTemplate = require(viewsDir + 'html-static.html');

// TODO: add updated date as query param
module.exports = {
  method: 'POST',
  path: '/rendering-info/html-static',
  config: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: {
        item: schema,
        toolRuntimeConfig: Joi.object()
      }
    },
    cors: true
  },
  handler: function(request, reply) {
    if (request.query.updatedDate) {
      request.payload.item.updatedDate = request.query.updatedDate;
    }
    let data = {
      stylesheets: [
        {
          name: 'default',
          type: 'critical'
        }
      ],
      markup: staticTemplate.render(request.payload.item)
    }
    return reply(data);
  }
}
