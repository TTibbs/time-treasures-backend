const { selectHistories } = require("../models/histories-models")


exports.getHistory = (req, res, next) => {
    selectHistories()
    .then((histories) => {
        res.status(200).send({ histories })
    })
    .next(err)
}