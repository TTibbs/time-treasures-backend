const {
  selectTasks,
  selectTaskByUserId,
  // selectDefaultTasks,
  selectTaskByTaskId,
  createTaskByUserId
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

exports.postTaskByUserId = (req, res, next) => {
  const { user_id } = req.params
  const newTask = req.body

  createTaskByUserId(user_id, newTask)
  .then((task)=>{
    res.status(201).send({ task })
  })
  .catch((err) => {
    next(err)
  })
}
