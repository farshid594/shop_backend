const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    title: String,
    permisions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Permision" }],
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
