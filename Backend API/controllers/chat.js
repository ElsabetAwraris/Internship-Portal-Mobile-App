const mongoose = require("mongoose");
const Chat = require("../models/chat");
const User = require("../models/users");
const Company = require("../models/company");

//endpoint to post Chats and store it in the backend
const sendChat = async (req, res) => {
  try {
    const { sender, recipient, chatType, chat, role } = req.body;

    if (role === "company") {
      const senderUser = await Company.findById(sender);
      if (!senderUser) {
        return res.status(404).json({ error: "Sender user not found" });
      }
      const recipientExists = senderUser.interns.includes(recipient);

      if (!recipientExists) {
        await senderUser.addIntern(recipient);
      }
    } else {
      const senderUser = await User.findById(sender);
      if (!senderUser) {
        return res.status(404).json({ error: "Sender user not found" });
      }

      const recipientExists = senderUser.company.includes(recipient);

      if (!recipientExists) {
        await senderUser.addCompany(recipient);
      }
    }

    if (role === "company") {
      const recipientUser = await User.findById(recipient);
      if (!recipientUser) {
        return res.status(404).json({ error: "recipient user not found" });
      }

      const senderExists = recipientUser.company.includes(sender);

      if (!senderExists) {
        await recipientUser.addCompany(sender);
      }
    } else {
      const recipientUser = await Company.findById(recipient);
      if (!recipientUser) {
        return res.status(404).json({ error: "recipient user not found" });
      }

      const senderExists = recipientUser.interns.includes(sender);

      if (!senderExists) {
        await recipientUser.addIntern(sender);
      }
    }

    // Create a new chat
    let sModel;
    let rModel;
    if (role === "company") {
      (sModel = "Company"), (rModel = "User");
    } else {
      (sModel = "User"), (rModel = "Company");
    }
    const newChat = new Chat({
      sender,
      recipient,
      chatType,
      chat,
      senderModel: sModel,
      recipientModel: rModel,
      timestamp: new Date(),
    });

    // Save the new chat
    await newChat.save();

    // Respond with success
    res.status(200).json({ chat: "Chat sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//endpoint to fetch the chats between two users in the chatRoom
const getChat = async (req, res) => {
  const { sender, recipient } = req.params;

  try {
    const chats = await Chat.find({
      $or: [
        { sender: sender, recipient: recipient },
        { sender: recipient, recipient: sender },
      ],
    }).populate("sender", "_id");

    res.json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getChat,
  sendChat,
};
