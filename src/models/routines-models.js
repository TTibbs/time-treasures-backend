const db = require("../../db/connection.js");

exports.selectRoutinesByUserId = (user_id) => {
    return db
      .query(`SELECT * FROM routines WHERE routines.user_id = $1`, [user_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Error retrieving routines",
          });
        }
        return rows;
      });
    };

exports.selectRoutineByRoutineId = (routine_id) => {
    return db
      .query(`SELECT * FROM routines WHERE routines.routine_id = $1`, [routine_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Routine not found",
          });
        }
        return rows[0];
      });
    };