const db = require("../../db/connection.js");
const { formatRoutineTasks } = require("../../db/seeds/utils.js");

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

exports.createRoutineByUserId = (user_id, {routine_name, tasks, target_time}) => {
    const routineObj = {
        routineName: routine_name,
        userId: user_id,
        tasks: tasks,
        targetTime: target_time}
    console.log(routineObj)
    .then((routineObj) => {
      console.log(routineObj)
      const formattedData = (routineObj) => {
        return formatRoutineTasks(routineObj)
      }
    })
    .then((formattedData) => {
      console.log(formattedData, "formattedData")
      return db
        .query(`INSERT INTO routines (routine_name, user_id, task_1, task_2, task_3, task_4, task_5, task_6, task_7, task_8, task_9, task_10, task_11, task_12, task_13, task_14, task_15, target_time)
        VALUES %L
        RETURNING *;`, [formattedData])
        .then(({ rows }) => {
          return rows[0]
        })
    })
}