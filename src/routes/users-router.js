const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
} = require("../controllers/users-controllers.js");

usersRouter.get("/", getUsers);
usersRouter.get("/:user_id", getUserById);

module.exports = usersRouter;
