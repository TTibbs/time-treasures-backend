const tasksRouter = require("express").Router();
const {
  getTasks,
  getTasksByUserId,
} = require("../controllers/tasks-controllers");

tasksRouter.get("/", getTasks);
tasksRouter.get("/:user_id", getTasksByUserId);

module.exports = tasksRouter;
