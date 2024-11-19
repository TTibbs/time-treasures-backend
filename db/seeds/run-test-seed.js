const testData = require('../data/test-data/index.js');
const seed = require('./seed');

const db = require('../connection.js');

function runTestSeed() {
return seed(testData).then(() => db.end());
}
runTestSeed()