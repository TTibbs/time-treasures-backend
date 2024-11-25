const { response } = require("../app");
const {
  selectHistories,
  selectHistoriesByUserId,
  selectHistoriesByRoutineId,
} = require("../models/histories-models");

exports.getHistory = (req, res, next) => {
  selectHistories()
    .then((histories) => {
      res.status(200).send({ histories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getHistoryByUserId = (req, res, next) => {
  const { user_id } = req.params;
  selectHistoriesByUserId(user_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getHistoryByRoutineId = (req, res, next) => {
  const { routine_id } = req.params;
  selectHistoriesByRoutineId(routine_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
