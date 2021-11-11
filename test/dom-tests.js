const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const Hapi = require("@hapi/hapi");
const lab = (exports.lab = Lab.script());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = Code.expect;
const before = lab.before;
const after = lab.after;
const it = lab.it;

const routes = require("../routes/routes.js");

let server;

before(async () => {
  try {
    server = Hapi.server({
      port: process.env.PORT || 3000,
    });
    server.route(routes);
  } catch (err) {
    expect(err).to.not.exist();
  }
});

after(async () => {
  await server.stop({ timeout: 2000 });
  server = null;
});

function element(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  });
}

function elementCount(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelectorAll(selector).length);
  });
}

lab.experiment("Q election votes dom tests", () => {
  it("should pass if threshold marker is found", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/results-threshold-color-codes-overwrite.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-election-threshold"
    ).then(value => {
      expect(value).to.be.equal(1);
    });
  });
  it("should pass if for each data entry a DOM element is created", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/results-threshold-color-codes-overwrite.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(response.result.markup, "div.q-election-item").then(
      value => {
        expect(value).to.be.equal(6);
      }
    );
  });
});

lab.experiment("error margin data", () => {
  it("should show error margin layout if hasErrorMargin is set to true", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/results-partly-previous-color-class-uncertainty.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-election-item-error-margin-bar"
    ).then(value => {
      expect(value).to.be.equal(6);
    });
  });
});
