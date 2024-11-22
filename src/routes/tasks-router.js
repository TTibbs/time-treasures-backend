const tasksRouter = require("express").Router();
const {
  getTasks,
  getTaskByTaskId,
  deleteTask
} = require("../controllers/tasks-controllers");

tasksRouter.get("/", getTasks);
tasksRouter.get("/:task_id", getTaskByTaskId);
tasksRouter.delete("/:task_id", deleteTask);

module.exports = tasksRouter;
