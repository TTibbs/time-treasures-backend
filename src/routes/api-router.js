const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users-router.js");
const tasksRouter = require("./tasks-router.js");
const endpoints = require("../endpoints.json");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/tasks", tasksRouter);

module.exports = apiRouter;
