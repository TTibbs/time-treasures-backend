const {
  getHistory,
  getHistoryByUserId,
  getHistoryByRoutineId,
} = require("../controllers/histories-controllers");

const historiesRouter = require("express").Router();

historiesRouter.get("/", getHistory);
historiesRouter.get("/:user_id", getHistoryByUserId);
historiesRouter.get("/routine/:routine_id", getHistoryByRoutineId);

module.exports = historiesRouter;
