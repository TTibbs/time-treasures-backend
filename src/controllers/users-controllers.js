const {
  selectUsers,
  selectUserById,
  updateUserById,
  selectUserForHistoryPost,
} = require("../models/users-models.js");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params;
  selectUserById(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchUserById = (req, res, next) => {
  const { user_id } = req.params;
  const keyToPatch = Object.entries(req.body)[0];
  const promises = [
    selectUserById(user_id),
    updateUserById(user_id, keyToPatch),
  ];
  Promise.all(promises)
    .then((result) => {
      const patchedUser = result[1];
      res.status(200).send({ patchedUser });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postHistoryByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const { routineId, timestamp, time } = req.body;

  if (isNaN(Number(user_id)) || Number(user_id) <= 0) {
    return res.status(404).send({ msg: "User not found" });
  }

  if (!routineId || !timestamp || !time) {
    return res
      .status(400)
      .send({ msg: "Bad request: Missing required fields" });
  }

  const newHistoryPost = {
    user_id: Number(user_id),
    routineId,
    timestamp,
    time,
  };

  selectUserForHistoryPost(newHistoryPost)
    .then((createdHistory) => {
      res.status(201).send({ completedRoutine: createdHistory });
    })
    .catch((err) => {
      next(err);
    });
};
