const express = require("express");
const {
  createInternship,
  getInternships,
  getInternship,
  getPopularInternships,
  getNearestInternships,
} = require("../controllers/internship");

const router = express.Router();

router.get("/", getInternships);
router.get("/:id", getInternship);
router.post("/", createInternship);
router.get("/popular/recent", getPopularInternships);
router.get("/nearest/recent", getNearestInternships);

module.exports = router;
