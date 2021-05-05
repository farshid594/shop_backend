const Role = require("../models/Role");

function CheckRole(req, res, next) {
  try {
    Role.findById(req.user.role)
      .select("permisions")
      .populate("permisions", "method path")
      .exec((err, doc) => {
        if (err) {
          return res.status(500).json({ message: "server error" });
        }
        let result = false;
        doc.permisions.forEach((permision) => {
          if (
            permision.path === req.url &&
            permision.method.includes(req.method)
          ) {
            result = true;
          }
        });

        if (result) {
          next();
        } else {
          return res.status(401).json({ message: "unAuthorize!" });
        }
      });
  } catch (e) {
    return res.status(401).json({ message: "user not exist" });
  }
}

module.exports = CheckRole;
