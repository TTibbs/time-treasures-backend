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

exports.selectHistoriesByUserId = (id) => {
  return db
    .query(`SELECT * FROM histories WHERE user_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "History Not Found",
        });
      }
      return { histories: rows };
    });
};

exports.selectHistoriesByRoutineId = (routine_id) => {
  if (isNaN(routine_id)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(`SELECT * FROM histories WHERE routine_id = $1`, [routine_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "History Not Found",
        });
      }
      return { histories: rows };
    });
};
