const {
  selectTasks,
  selectTaskByUserId,
  selectDefaultTasks,
} = require("../models/tasks-models");

exports.getTasks = (req, res, next) => {
  selectTasks()
    .then((tasks) => {
      res.status(200).send({ tasks });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTasksByUserId = (req, res, next) => {
  const { user_id } = req.params;
  selectTaskByUserId(user_id)
    .then((tasks) => {
      res.status(200).send({ tasks });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getDefaultTasks = (req, res, next) => {
  selectDefaultTasks()
    .then((tasks) => {
      res.status(200).send({ tasks });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
