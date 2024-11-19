const db = require("../../db/connection.js");

exports.selectTasks = () => {
  return db.query(`SELECT * FROM tasks`).then(({ rows }) => {
    return rows;
  });
};

exports.selectTaskByUserId = (user_id) => {
  
  return db
    .query(`SELECT * FROM tasks WHERE tasks.user_id = $1 OR is_default = true`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User doesn't have any tasks",
        });
      }
      return rows;
    });
};