const tasksRouter = require("express").Router();
const {
  getTasks,
  getTaskByTaskId
} = require("../controllers/tasks-controllers");

tasksRouter.get("/", getTasks);
tasksRouter.get("/:task_id", getTaskByTaskId);


module.exports = tasksRouter;
