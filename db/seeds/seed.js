const format = require("pg-format");
const db = require("../connection.js");
const {
  historiesData,
  tasksData,
  routinesData,
} = require("../data/test-data/index.js");

const seed = ({ userData, historiesData, tasksData, routinesData }) => {
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
            task_1 REFERENCES tasks(taskId) NOT NULL,
            task_2 REFERENCES tasks(taskId) NOT NULL,
            task_3 REFERENCES tasks(taskId),
            task_4 REFERENCES tasks(taskId),
            task_5 REFERENCES tasks(taskId),
            task_6 REFERENCES tasks(taskId),
            task_7 REFERENCES tasks(taskId),
            task_8 REFERENCES tasks(taskId),
            task_9 REFERENCES tasks(taskId),
            task_10 REFERENCES tasks(taskId),
            task_11 REFERENCES tasks(taskId),
            task_12 REFERENCES tasks(taskId),
            task_13 REFERENCES tasks(taskId),
            task_14 REFERENCES tasks(taskId),
            task_15 REFERENCES tasks(taskId),
        )`);
    });
};
