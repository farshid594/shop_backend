const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    name: { type: String, maxLength: 50 },
    email: { type: String, maxLength: 100 },
    mobile: { type: String, maxLength: 20 },
    message: { type: String, maxLength: 1000 },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
