const jwt = require("jsonwebtoken");
const User = require("../models/User");

function CheckUserMiddleWare(req, res, next) {
  try {
    var token = req.headers.authorization;
    var { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    User.findById(userID, (err, doc) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      if (doc === null) {
        return res.status(401).json({ message: "user not exist" });
      }
      if (doc.tokens.includes(token)) {
        req.user = doc;
        next();
      } else {
        return res.status(401).json({ message: "user not exist" });
      }
    });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
}

module.exports = CheckUserMiddleWare;
