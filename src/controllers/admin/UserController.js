const User = require("../../models/User");

exports.GetUserInfo = function (req, res) {
  res.status(200).json({
    user: {
      name: req.user.firstName + " " + req.user.lastName,
    },
  });
};

exports.Logout = function (req, res) {
  const token = req.headers.authorization;
  req.user.tokens = req.user.tokens.filter((t) => {
    if (t === token) {
      return false;
    }
    return true;
  });
  req.user.save((err) => {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    res.status(200).json({});
  });
};

exports.GetAllUsers = function (req, res) {
  try {
    var { page, sortField, sortType, name, family, email, isAdmin } = req.query;
    const ItemPerPage = 4
    console.log(isAdmin);
    User.find()
      .where({
        firstName: { $regex: new RegExp(name, "i") }, lastName: { $regex: new RegExp(family, "i") },
        email: { $regex: new RegExp(email, "i") },
        isAdmin: (isAdmin === "" || isAdmin === undefined) ? { $in: [false, true] } : isAdmin
      })
      .select("firstName lastName email isAdmin createdAt role")
      .populate("role", "title")
      .sort([[sortField, sortType]])
      .limit(ItemPerPage)
      .skip((page - 1) * ItemPerPage)
      .exec((err, docs) => {
        if (err) {
          return res.status(401).json({ message: "user not exist" });
        }
        User.countDocuments({
          firstName: { $regex: new RegExp(name, "i") }, lastName: { $regex: new RegExp(family, "i") },
          email: { $regex: new RegExp(email, "i") },
          isAdmin: (isAdmin === "" || isAdmin === undefined) ? { $in: [false, true] } : isAdmin
        }, (err, count) => {
          if (err) {
            return res.status(401).json({ message: "user not exist" });
          }
          res.status(200).json({ data: docs, pagesCount: Math.ceil(count / ItemPerPage) });
        })
      });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.DeleteUser = function (req, res) {
  try {
    var { _id } = req.query;
    User.findByIdAndRemove(_id, (err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      return res.status(200).json({ message: "user deleted successfully!" });
    });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.ToggleUserAdmin = function (req, res) {
  try {
    var { _id } = req.query;
    User.findById(_id, (err, doc) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      doc.isAdmin = !doc.isAdmin;
      doc.save((err) => {
        if (err) {
          return res.status(401).json({ message: "user not exist" });
        }
        return res.status(200).json({ message: "user updated successfully!" });
      });
    });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
exports.AddRoleToUser = function (req, res) {
  try {
    var { userID, roleID } = req.body;
    User.findByIdAndUpdate(userID, { $set: { role: roleID } }, (err) => {
      if (err) {
        return res.status(401).json({ message: "user not exist" });
      }
      return res.status(200).json({ message: "successfully!" });
    });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
};
