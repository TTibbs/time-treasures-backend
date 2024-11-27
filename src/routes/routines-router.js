const routinesRouter = require("express").Router();
const {
  getRoutineByRoutineId, deleteRoutine, patchRoutine, getTasksByRoutine
} = require("../controllers/routines-controllers");

routinesRouter.get("/:routine_id", getRoutineByRoutineId);
routinesRouter.delete("/:routine_id", deleteRoutine)
routinesRouter.patch("/:routine_id", patchRoutine)
routinesRouter.get("/:routine_id/tasks", getTasksByRoutine)

module.exports = routinesRouter;
