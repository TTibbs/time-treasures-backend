const db = require("../../db/connection.js");

exports.selectHistories = () => {
  return db.query(`SELECT * FROM histories`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "No histories",
      });
    }
    return rows;
  });
};


