const seed = require("../seeds/seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed().then(() => db.end());
};

runSeed();
