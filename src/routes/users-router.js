const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  
} = require("../controllers/users-controllers.js");

const { getTasksByUserId, postTaskByUserId } = require("../controllers/tasks-controllers.js")
const { getRoutinesByUserId } = require("../controllers/routines-controllers.js")

usersRouter.get("/", getUsers);
usersRouter.get("/:user_id", getUserById);
usersRouter.get("/:user_id/tasks", getTasksByUserId);
usersRouter.post("/:user_id/tasks", postTaskByUserId)
usersRouter.get("/:user_id/routines", getRoutinesByUserId);

module.exports = usersRouter;
