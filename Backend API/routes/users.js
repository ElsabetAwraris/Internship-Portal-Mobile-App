const express = require("express");

// controller functions
const {
  registerUser,
  loginUser,
  getCompany,
  confirmationEmail,
  confirmCode,
  resetPassword,
  getUser,
  updateUserInfo,
  changePassword,
  updateEmail,
} = require("../controllers/users");

const router = express.Router();

router.post("/registration", registerUser);
router.post("/login", loginUser);
router.get("/company/:id", getCompany);
router.post("/confirmation/", confirmationEmail);
router.post("/check", confirmCode);
router.post("/resetPassword", resetPassword);
router.get("/:id", getUser);
router.put("/:id", updateUserInfo);
router.put("/password/change", changePassword);
router.put("/email/:id", updateEmail);

module.exports = router;
