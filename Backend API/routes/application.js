// companyRoutes.js
const express = require("express");
const {
  apply,
  acceptApplication,
  getApplication,
  getMyApplication,
} = require("../controllers/application");
const { uploadFiles } = require("../middleware/multer");

const router = express.Router();

// Route to create a new company
router.post("/", uploadFiles, apply);
router.post("/accept/:id", acceptApplication);
router.get("/:id", getApplication);
router.get("/", getMyApplication);

module.exports = router;
