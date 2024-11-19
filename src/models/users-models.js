const db = require("../../db/connection.js");

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

exports.selectUserById = (user_id) => {
  return db
    .query(`SELECT * FROM users WHERE users.user_id = $1`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User does not exist" });
      }
      return rows[0];
    });
};
