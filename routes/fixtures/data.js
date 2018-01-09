const fixtureDataDirectory = '../../resources/fixtures/data';

// provide every fixture data file present in ../../resources/fixtures/data
const fixtureData = [
  require(`${fixtureDataDirectory}/no-results-threshold-others.json`),
  require(`${fixtureDataDirectory}/results-partly-previous-color-class.json`),
  require(`${fixtureDataDirectory}/results-long-names-threshold-others-color-codes.json`),
  require(`${fixtureDataDirectory}/results-threshold-color-codes-overwrite.json`),
];

module.exports = {
  path: '/fixtures/data',
  method: 'GET',
  options: {
    tags: ['api'],
    cors: true
  },
  handler: (request, h) => {
    return fixtureData;
  }
}
