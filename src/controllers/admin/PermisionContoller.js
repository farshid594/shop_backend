const Permision = require("../../models/Permision");

exports.EditPermision = function (req, res) {
  try {
    var { _id, title, path, method } = req.body
    Permision.findByIdAndUpdate(_id, { $set: { title: title, path: path, method: method } }, (err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ message: "successfull!" });
    })
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.AddPermision = function (req, res) {
  try {
    var newPermision = new Permision(req.body);
    newPermision.save((err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ message: "successfull!" });
    });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.GetAllPermisions = function (req, res) {
  try {
    Permision.find((err, docs) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ data: docs });
    })
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.DeletePermision = function (req, res) {
  try {
    var { _id } = req.query

    Permision.findByIdAndDelete(_id, (err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ message: "SuccessFull!" });
    })
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
