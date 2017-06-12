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

const displayOptionsSchema = Enjoi(JSON.parse(fs.readFileSync(resourcesDir + 'display-options-schema.json', {
  encoding: 'utf-8'
})));

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
        toolRuntimeConfig: {
          displayOptions: displayOptionsSchema
        }
      }
    },
    cors: true
  },
  handler: function(request, reply) {    
    // rendering data will be used by template to create the markup
    // it contains the item itself and additional options impacting the markup
    let renderingData = {
      item: request.payload.item
    }

    if (request.query.updatedDate) {
      renderingData.item.updatedDate = request.query.updatedDate;
    }

    if (request.payload.toolRuntimeConfig) {
      renderingData.toolRuntimeConfig = request.payload.toolRuntimeConfig;
    }

    let data = {
      stylesheets: [
        {
          name: 'default'
        }
      ],
      markup: staticTemplate.render(renderingData)
    }

    // add sophie viz color module to stylesheets in response iff necessary
    let isSophieVizColorDefined = false;
    let parties = request.payload.item.parties;
    if (parties !== undefined) {
      parties.forEach(party => {
        let vizPattern = /^s-viz-color-party.*/;
        if (_.has(party, 'color.classAttribute') && vizPattern.test(party.color.classAttribute)) {
          isSophieVizColorDefined = true;
        }
      })
    }

    if (isSophieVizColorDefined) {
      data.stylesheets.push({
        url: 'https://service.sophie.nzz.ch/bundle/sophie-viz-color@^1.0.0[parties].css'
      });
    }

    return reply(data);
  }
}
