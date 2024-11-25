const routinesRouter = require("express").Router();
const {
  getRoutineByRoutineId, deleteRoutine, patchRoutine
} = require("../controllers/routines-controllers");

routinesRouter.get("/:routine_id", getRoutineByRoutineId);
routinesRouter.delete("/:routine_id", deleteRoutine)
routinesRouter.patch("/:routine_id", patchRoutine)

module.exports = routinesRouter;
