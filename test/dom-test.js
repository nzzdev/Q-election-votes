const JsDom = require('jsdom');
const expect = require('chai').expect;

const mockData = require('./resources/mock-data');
require('svelte/ssr/register');
const staticTpl = require('../views/html-static.html');
var markup = staticTpl.render(JSON.parse(JSON.stringify(mockData)));


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
  it('should pass if vote bars marked as intermediate results are found', function() {
    return elementCount('div.q-election-item-bar').then(barCount => {
      return elementCount('div.q-election-item-bar--dotted').then(dottedCount => {
        expect(barCount).to.be.equal(dottedCount);
        expect(dottedCount).to.be.above(0);
      })
    })
  })

  it('should pass if for each data entry a DOM element is created', function() {
    return elementCount('div.q-election-item-info').then(value => {
      expect(value).to.be.equal(mockData.data.parties.length);
    })
  })

  it('should pass if a threshold is part of the DOM', function() {
    return elementCount('div.q-election-threshold-line').then(value => {
      expect(value).to.be.above(0);
    })
  })
})
