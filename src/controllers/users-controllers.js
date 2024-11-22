const { selectUsers, selectUserById, updateUserById } = require("../models/users-models.js");

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
  const keyToPatch = Object.entries(req.body)[0]
  const promises = [selectUserById(user_id), updateUserById(user_id, keyToPatch)]
  Promise.all(promises)
  .then((result) => {
    const patchedUser = result[1]
    res.status(202).send({ patchedUser })
  })
  .catch((err) => {
    next(err);
  })
};



