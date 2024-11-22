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
          msg: "Error retrieving tasks",
        });
      }
      return rows;
    });
};

exports.selectTaskByTaskId = (task_id) => {
   
  return db
  .query(`SELECT * FROM tasks WHERE task_id = $1`, [task_id])
  .then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404, 
        msg: "Task not Found"
      })
    }

    return rows[0]

  })
}

exports.createTaskByUserId = (user_id, {task_name, gem_value} ) => {
  if (!task_name || !gem_value) {
    return Promise.reject({status: 400, msg: "Missing input"})
  }
  return db
  .query(`INSERT INTO tasks (user_id, task_name, gem_value, is_default)
    VALUES ($1, $2, $3, false)
    RETURNING *;`, [user_id, task_name, gem_value])
  .then(({ rows }) => {
    return rows[0]
  })
}
