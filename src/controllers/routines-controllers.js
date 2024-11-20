const {
    selectRoutinesByUserId,
    selectRoutineByRoutineId
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