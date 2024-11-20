const routinesRouter = require("express").Router();
const {
  getRoutineByRoutineId
} = require("../controllers/routines-controllers");

routinesRouter.get("/:routine_id", getRoutineByRoutineId);


module.exports = routinesRouter;