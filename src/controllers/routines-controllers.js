const {
  selectRoutinesByUserId,
  selectRoutineByRoutineId,
  createRoutineByUserId,
  deleteRoutineById,
  updateRoutine,
  selectTasksByRoutine
} = require("../models/routines-models");

exports.getRoutinesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  selectRoutinesByUserId(user_id)
    .then((routines) => {
      res.status(200).send({ routines });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRoutineByRoutineId = (req, res, next) => {
  const { routine_id } = req.params;
  selectRoutineByRoutineId(routine_id)
    .then((routine) => {
      res.status(200).send({ routine });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postRoutineByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const newRoutine = req.body;
  createRoutineByUserId(user_id, newRoutine)
    .then((routine) => {
      res.status(201).send({ routine });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteRoutine = (req, res, next) => {
  const { routine_id } = req.params
  deleteRoutineById(routine_id)
  .then(({status}) => {
    res.status(status).send()
  })
  .catch((err) => {
    next(err)
  })
}

exports.patchRoutine = (req, res, next) => {
  const { routine_id } = req.params
  const { tasks, routine_name, target_time } = req.body
  
  
  updateRoutine(routine_id, tasks, routine_name, target_time)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((err) => {
    next(err)
  })
}

exports.getTasksByRoutine = (req, res, next) => {
  const { routine_id } = req.params
  selectTasksByRoutine(routine_id)
  .then((response) => {
    res.status(200).send({tasks: response})
  })
  .catch((err) => {
    console.log(err)
  })
}