const routinesRouter = require("express").Router();
const {
  getRoutineByRoutineId, deleteRoutine
} = require("../controllers/routines-controllers");

routinesRouter.get("/:routine_id", getRoutineByRoutineId);
routinesRouter.delete("/:routine_id", deleteRoutine)

module.exports = routinesRouter;
