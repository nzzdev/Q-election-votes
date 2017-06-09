const JsDom = require('jsdom');
const expect = require('chai').expect;

const mockData = require('./resources/mock-data-v2.0.0');
require('svelte/ssr/register');
const staticTpl = require('../views/html-static.html');
const renderingData = {
  item: mockData,
  toolRuntimeConfig: {
    displayOptions: {}
  }
}
var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));


function element(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelector(selector));
      })
  })
}

function elementCount(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelectorAll(selector).length);
      })
  })
}

describe('Q election votes dom tests', function() {
  it('should pass if threshold marker is found', function() {
    return elementCount('div.q-election-threshold').then(value => {
        expect(value).to.be.equal(1);
    })
  })

  it('should pass if for each data entry a DOM element is created', function() {
    return elementCount('div.q-election-item').then(value => {
      expect(value).to.be.equal(mockData.parties.length);
    })
  })
})
