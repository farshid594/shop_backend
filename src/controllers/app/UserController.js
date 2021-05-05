const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

exports.SignUp = function (req, res) {
  try {
    var { firstName, lastName, email, password } = req.body;
    bcrypt.hash(password, bcrypt.genSaltSync(10), (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
      });

      newUser.save((err) => {
        if (err) {
          return res.status(500).json({ message: "server error" });
        }
        res.status(200).json({ message: "Signup successful" });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};
exports.Signin = function (req, res) {
  try {
    var { email, password } = req.body;
    User.findOne({ email: email }, (err, doc) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (doc === null) {
        return res.status(404).json({ message: "user not exist!" });
      }
      bcrypt.compare(password, doc.password, (err, same) => {
        if (err) {
          return res.status(500).json({ message: "server error" });
        }
        if (!same) {
          return res.status(404).json({ message: "user not exist!" });
        }
        const token = jwt.sign(
          { userID: doc._id, date: new Date() },
          process.env.JWT_SECRET_KEY
        );
        doc.tokens = [...doc.tokens, token];
        doc.save((err) => {
          if (err) {
            return res.status(500).json({ message: "server error" });
          }
          res.status(200).json({ token: token });
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};
exports.SigninAsAdmin = function (req, res) {
  try {
    var { email, password } = req.body;
    User.findOne({ email: email }, (err, doc) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (doc === null) {
        return res.status(404).json({ message: "user not exist!" });
      }
      if (!doc.isAdmin) {
        return res.status(404).json({ message: "user not exist!" });
      }
      bcrypt.compare(password, doc.password, (err, same) => {
        if (err) {
          return res.status(500).json({ message: "server error" });
        }
        if (!same) {
          return res.status(404).json({ message: "user not exist!" });
        }
        const token = jwt.sign(
          { userID: doc._id, date: new Date() },
          process.env.JWT_SECRET_KEY
        );
        doc.tokens = [...doc.tokens, token];
        doc.save((err) => {
          if (err) {
            return res.status(500).json({ message: "server error" });
          }
          res.status(200).json({ token: token });
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};
