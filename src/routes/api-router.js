const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users-router.js");
const tasksRouter = require("./tasks-router.js");
const endpoints = require("../endpoints.json");
const routinesRouter = require("./routines-router.js");
const historiesRouter = require("./history-router.js");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints });
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/routines", routinesRouter);
apiRouter.use("/histories", historiesRouter);

module.exports = apiRouter;
