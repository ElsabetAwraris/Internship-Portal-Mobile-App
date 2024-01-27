const express = require("express");

// controller functions
const { sendChat, getChat } = require("../controllers/chat");

const router = express.Router();

// message route
router.post("/", sendChat);
router.get("/:sender/:recipient", getChat);

module.exports = router;
