const { getHistory } = require("../controllers/histories-controllers");

const historiesRouter = require("express").Router();


historiesRouter.get("/", getHistory );


module.exports = historiesRouter;