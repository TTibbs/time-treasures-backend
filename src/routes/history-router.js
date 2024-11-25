const { getHistory, getHistoryByUserId } = require("../controllers/histories-controllers");

const historiesRouter = require("express").Router();

historiesRouter.get("/", getHistory);
historiesRouter.get("/:user_id", getHistoryByUserId);

module.exports = historiesRouter;
