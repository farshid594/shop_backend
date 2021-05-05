const jwt = require("jsonwebtoken");
const User = require("../models/User");

function CheckAdminMiddleWare(req, res, next) {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ message: "user not exist" });
    }
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
}

module.exports = CheckAdminMiddleWare;
