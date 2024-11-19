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
    .query(`DROP TABLE IF EXISTS histories;`)
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
            levelId SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            gems_lower INT NOT NULL,
            gems_upper INT
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE users (
            userId SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            level INT NOT NULL DEFAULT 1 REFERENCES levels(levelId),
            totalGems INT NOT NULL DEFAULT 0
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE tasks (
            taskId SERIAL PRIMARY KEY NOT NULL,
            userId INT REFERENCES users(userId),
            taskName VARCHAR NOT NULL,
            gemValue INT NOT NULL
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE routines (
            routineId SERIAL PRIMARY KEY NOT NULL,
            task_1 INT REFERENCES tasks(taskId) NOT NULL,
            task_2 INT REFERENCES tasks(taskId) NOT NULL,
            task_3 INT REFERENCES tasks(taskId),
            task_4 INT REFERENCES tasks(taskId),
            task_5 INT REFERENCES tasks(taskId),
            task_6 INT REFERENCES tasks(taskId),
            task_7 INT REFERENCES tasks(taskId),
            task_8 INT REFERENCES tasks(taskId),
            task_9 INT REFERENCES tasks(taskId),
            task_10 INT REFERENCES tasks(taskId),
            task_11 INT REFERENCES tasks(taskId),
            task_12 INT REFERENCES tasks(taskId),
            task_13 INT REFERENCES tasks(taskId),
            task_14 INT REFERENCES tasks(taskId),
            task_15 INT REFERENCES tasks(taskId),
            targetTime INT NOT NULL
        )`);
    })
    .then(() => {
      return db.query(`
            CREATE TABLE histories (
            userId INT REFERENCES users(userId),
            routineId INT REFERENCES routines(routineId),
            timestamp TIMESTAMP DEFAULT NOW(),
            totalTime INT NOT NULL
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
        `INSERT INTO users (username, email, level, totalGems) VALUES %L`,
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
        `INSERT INTO tasks (userId, taskName, gemValue) VALUES %L`,
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
      const insertedRoutinesQueryStr = format(
        `INSERT INTO routines (userID, 
        tasks_1, 
        tasks_2, 
        tasks_3, 
        tasks_4, 
        tasks_5, 
        tasks_6,
        tasks_7, 
        tasks_8, 
        tasks_9, 
        tasks_10, 
        tasks_11, 
        tasks_12,
        tasks_13,
        tasks_14,
        tasks_15,
        targetTime) VALUES %L`,
        formattedData
      );
      return db.query(insertedRoutinesQueryStr)
    })
    .then(() => {
      const insertedHistoriesQueryStr = format(
        `INSERT INTO histories (userId, routineId, timestamp, totalTime) VALUES %L`,
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
