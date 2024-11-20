const {
  selectTasks,
  selectTaskByUserId,
  // selectDefaultTasks,
  selectTaskByTaskId

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

exports.getTaskByTaskId = (req, res, next) => {
  const { task_id } = req.params
  selectTaskByTaskId(task_id)
  .then((task)=>{
    res.status(200).send({ task })
  })
  .catch((err) => {
    next(err)
  })
}