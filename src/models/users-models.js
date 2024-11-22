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

exports.updateUserById = (user_id, keyToPatch) => {
  return db
    .query(`UPDATE users SET ${keyToPatch[0]} = $1 WHERE user_id = $2 RETURNING *;`, [keyToPatch[1],user_id])
    .then(({rows}) => {
      return rows[0]
    });
}
