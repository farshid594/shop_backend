const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, maxLength: 30 },
    lastName: { type: String, maxLength: 30 },
    email: { type: String, maxLength: 80, unique: true, index: true },
    password: String,
    tokens: [String],
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Order" }],
    cartContent: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }],
    wishLists: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }],
    addresses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Address" }],
    defaultAddress: { type: mongoose.SchemaTypes.ObjectId, ref: "Address" },
    role: { type: mongoose.SchemaTypes.ObjectId, ref: "Role" },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
