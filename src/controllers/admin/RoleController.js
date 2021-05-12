const Role = require("../../models/Role");

exports.GetRoles = function (req, res) {
  try {
    Role.find({}, "title permisions").populate("permisions").exec((err, docs) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ data: docs });
    })
  } catch (e) {
    
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.EditRole = function (req, res) {
  try {
    var { _id, title, permisions } = req.body
    Role.findByIdAndUpdate(_id, { $set: { title: title, permisions: permisions } }, (err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ message: "successfull!" });
    })
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.AddRole = function (req, res) {
  try {
    var newRole = new Role(req.body);
    newRole.save((err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ message: "successfull!" });
    });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.DeleteRole = function (req, res) {
  try {
    var { _id } = req.query
    Role.findByIdAndRemove(_id, (err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      res.status(200).json({ message: "successfull!" });
    })
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
