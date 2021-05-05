const User = require("../models/User");
exports.SignUpValidate = function (req, res, next) {
  var errors = [];
  var { email, password } = req.body;
  if (password.length < 6) {
    errors.push({ key: "password", message: "Please enter a valid password" });
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    errors.push({ key: "email", message: "Please enter a valid email" });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }
  User.findOne({ email: email }, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    if (doc !== null) {
      errors.push({ key: "email", message: "Email exists" });
      return res.status(400).json({ errors: errors });
    }
    next();
  });
};
