const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  point: { type: Number },
  comment: { type: String, maxLength: 200 },
  cons: [string],
  pros: [String],
  active: { type: Boolean, default: false },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  product: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
});

const Review = mongoose.model("Review", ReviewSchema);
