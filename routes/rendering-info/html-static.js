const fs = require('fs');
const Enjoi = require('enjoi');
const Joi = require('joi');
const _ = require('lodash');
const resourcesDir = __dirname + '/../../resources/';
const viewsDir = __dirname + '/../../views/';

const schemaString = JSON.parse(fs.readFileSync(resourcesDir + 'schema.json', {
  encoding: 'utf-8'
}));
const schema = Enjoi(schemaString);

require('svelte/ssr/register');
const staticTemplate = require(viewsDir + 'html-static.html');

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

    let isSophieVizColorDefined = false;
    let parties = request.payload.item.parties;
    if (parties !== undefined) {
      parties.forEach(party => {
        let vizPattern = /^s-viz.*/;
        if (_.has(party, 'color.classAttribute') && vizPattern.test(party.color.classAttribute)) {
          isSophieVizColorDefined = true;
        }
      })
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

    if (isSophieVizColorDefined) {
      data.stylesheets.push({
        url: 'https://service.sophie.nzz.ch/bundle/sophie-viz-color@^1.0.0.css',
        type: 'critical'
      });
    }

    return reply(data);
  }
}
