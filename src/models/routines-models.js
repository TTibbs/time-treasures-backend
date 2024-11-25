const db = require("../../db/connection.js");
const { formatRoutineTasks } = require("../../db/seeds/utils.js");
const { response } = require("../app.js");

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
    .query(`SELECT * FROM routines WHERE routines.routine_id = $1`, [
      routine_id,
    ])
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

exports.createRoutineByUserId = (
  user_id,
  { routine_name, tasks, target_time }
) => {
  if (!routine_name || !tasks || !target_time) {
    return Promise.reject({ status: 400, msg: "Missing input" });
  }
  const routineObj = {
    routineName: routine_name,
    userId: user_id,
    tasks: tasks,
    targetTime: target_time,
  };

  const formattedData = formatRoutineTasks(routineObj);

  return db
    .query(
      `INSERT INTO routines (routine_name, user_id, task_1, task_2, task_3, task_4, task_5, task_6, task_7, task_8, task_9, task_10, task_11, task_12, task_13, task_14, task_15, target_time)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *;`,
      [
        formattedData[0],
        formattedData[1],
        formattedData[2],
        formattedData[3],
        formattedData[4],
        formattedData[5],
        formattedData[6],
        formattedData[7],
        formattedData[8],
        formattedData[9],
        formattedData[10],
        formattedData[11],
        formattedData[12],
        formattedData[13],
        formattedData[14],
        formattedData[15],
        formattedData[16],
        formattedData[17],
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
  // FormattedData to be refactored - need to learn how to destructure an array
};

exports.deleteRoutineById = (id) => {
  return db.query(`SELECT * FROM routines WHERE routine_id = $1`, [id])
  .then(({rows}) => {
    if (rows.length === 0) {
      return Promise.reject({status: 404, msg: "Routine Not Found"})
    }
    return db.query(`DELETE FROM routines WHERE routine_id = $1 RETURNING *`, [id])
    .then(() => {
      return {status: 204}
    })
  })
}

exports.updateRoutine = (id, tasks, routine_name, target_time) => {
  return db.query("SELECT * FROM routines WHERE routine_id = $1", [id])
  .then(({rows}) => {
    if (rows.length === 0) return Promise.reject({status: 404, msg: "Routine Not Found"})

    if (!Number(id) || (!tasks && !routine_name && !target_time)) {
      return Promise.reject({status: 400, msg: "Bad Request"})
    }
    
    const updateQuery = []
    if (tasks) {
      tasks.forEach((task, index) => {
        updateQuery.push(`task_${index + 1} = ${task}`)
      })
    }
    if (target_time) updateQuery.push(`target_time = ${target_time}`)
      
      
      return db.query(`UPDATE routines SET ${updateQuery.join(", ")} WHERE routine_id = ${id} RETURNING *`)
      .then(({rows}) => {
        if (routine_name) {
          return db.query("UPDATE routines SET routine_name = $1 WHERE routine_id = $2 RETURNING *", [routine_name, id])
          .then(({rows}) => {
            return rows
          })
        }
        return rows
      })
  })
}
