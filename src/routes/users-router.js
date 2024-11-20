const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  
} = require("../controllers/users-controllers.js");

const { getTasksByUserId} = require("../controllers/tasks-controllers.js")

usersRouter.get("/", getUsers);
usersRouter.get("/:user_id", getUserById);
usersRouter.get("/:user_id/tasks", getTasksByUserId);

module.exports = usersRouter;
