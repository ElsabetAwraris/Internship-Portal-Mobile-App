const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "senderModel",
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recipientModel",
  },
  chatType: {
    type: String,
    enum: ["text", "image"],
  },
  chat: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  senderModel: {
    type: String,
    enum: ["User", "Company"],
  },
  recipientModel: {
    type: String,
    enum: ["User", "Company"],
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
