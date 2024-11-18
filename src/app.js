const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

app.use("/api", apiRouter);

// Test

module.exports = app;
