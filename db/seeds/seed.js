const format = require("pg-format");
const db = require("../connection.js");
const { formatRoutineTasks } = require("./utils.js")

const seed = ({
  userData,
  historiesData,
  tasksData,
  routinesData,
  levelsData,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS histories`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS routines`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS tasks`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS levels`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE levels (
            level_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            gems_lower INT NOT NULL,
            gems_upper INT
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            level INT NOT NULL DEFAULT 1 REFERENCES levels(level_id),
            total_gems INT NOT NULL DEFAULT 0
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE tasks (
            task_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(user_id),
            task_name VARCHAR NOT NULL,
            gem_value INT NOT NULL
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE routines (
            routine_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(user_id) NOT NUll,
            task_1 INT REFERENCES tasks(task_id) NOT NULL,
            task_2 INT REFERENCES tasks(task_id) NOT NULL,
            task_3 INT REFERENCES tasks(task_id),
            task_4 INT REFERENCES tasks(task_id),
            task_5 INT REFERENCES tasks(task_id),
            task_6 INT REFERENCES tasks(task_id),
            task_7 INT REFERENCES tasks(task_id),
            task_8 INT REFERENCES tasks(task_id),
            task_9 INT REFERENCES tasks(task_id),
            task_10 INT REFERENCES tasks(task_id),
            task_11 INT REFERENCES tasks(task_id),
            task_12 INT REFERENCES tasks(task_id),
            task_13 INT REFERENCES tasks(task_id),
            task_14 INT REFERENCES tasks(task_id),
            task_15 INT REFERENCES tasks(task_id),
            target_time INT NOT NULL
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE histories (
            history_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(user_id),
            routine_id INT REFERENCES routines(routine_id),
            timestamp TIMESTAMP DEFAULT NOW(),
            total_time INT NOT NULL
        )`);
    })
    .then(() => {
      const insertedLevelsQueryStr = format(
        "INSERT INTO levels (name, gems_lower, gems_upper) VALUES %L",
        levelsData.map(({ name, gems_lower, gems_upper }) => [
          name,
          gems_lower,
          gems_upper,
        ])
      );
      return db.query(insertedLevelsQueryStr);
    })
    .then(() => {
      const insertedUsersQueryStr = format(
        `INSERT INTO users (username, email, level, total_gems) VALUES %L`,
        userData.map(({ username, email, level, totalGems }) => [
          username,
          email,
          level,
          totalGems,
        ])
      );
      return db.query(insertedUsersQueryStr);
    })
    .then(() => {
      const insertedTasksQueryStr = format(
        `INSERT INTO tasks (user_id, task_name, gem_value) VALUES %L`,
        tasksData.map(({ userId, taskName, gemValue }) => [
          userId,
          taskName,
          gemValue,
        ])
      );
      return db.query(insertedTasksQueryStr);
    })
    .then(() => {
      const formattedData = routinesData.map((routine) => {
        return formatRoutineTasks(routine)
      })
      console.log(formattedData)
      const insertedRoutinesQueryStr = format(
        `INSERT INTO routines (user_id, 
        task_1, 
        task_2, 
        task_3, 
        task_4, 
        task_5, 
        task_6,
        task_7, 
        task_8, 
        task_9, 
        task_10, 
        task_11, 
        task_12,
        task_13,
        task_14,
        task_15,
        target_time) VALUES %L`,
        formattedData
      );
      return db.query(insertedRoutinesQueryStr)
    })
    .then(() => {
      const insertedHistoriesQueryStr = format(
        `INSERT INTO histories (user_id, routine_id, timestamp, total_time) VALUES %L`,
        historiesData.map(({userId, routineId, timestamp, time}) => [
          userId,
          routineId,
          timestamp,
          time
        ])
      )
      return db.query(insertedHistoriesQueryStr)
    })
};

module.exports = seed;
