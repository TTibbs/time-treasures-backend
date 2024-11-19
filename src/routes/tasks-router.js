const tasksRouter = require("express").Router();
const {
  getTasks,
  getTasksByUserId,
  getDefaultTasks,
} = require("../controllers/tasks-controllers");

tasksRouter.get("/", getTasks);
tasksRouter.get("/:user_id", getTasksByUserId);
tasksRouter.get("/is_default", getDefaultTasks);

module.exports = tasksRouter;
