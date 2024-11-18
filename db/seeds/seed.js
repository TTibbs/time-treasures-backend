const format = require("pg-format");
const db = require("../connection.js");

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
    });
};
