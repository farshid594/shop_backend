const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermisionSchema = new Schema(
  {
    title: String,
    path: String,
    method: [String],
    roles: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Role" }],
  },
  {
    timestamps: true,
  }
);

const Permision = mongoose.model("Permision", PermisionSchema);
module.exports = Permision;
