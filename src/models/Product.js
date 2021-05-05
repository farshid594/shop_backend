const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: { type: String, maxLength: 100 },
    subtitle: { type: String, maxLength: 200 },
    price: { type: String, maxLength: 30 },
    images: [String],
    discount: { type: Number, max: 100 },
    count: { type: Number },
    description: { type: String, maxLength: 2000 },
    date: { type: String, maxLength: 20 },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tag" }],
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Order" }],
    sizes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Size" }],
    colors: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Color" }],
    reviews: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
