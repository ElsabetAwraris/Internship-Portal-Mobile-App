// companyRoutes.js
const express = require("express");
const {
  createCompany,
  loginCompany,
  getCompanies,
  getCompany,
  getInterns,
} = require("../controllers/company");

const router = express.Router();

// Route to create a new company
router.post("/registration", createCompany);
router.get("/", getCompanies);
router.get("/:id", getCompany);
router.post("/login", loginCompany);
router.get("/user/:id", getInterns);

module.exports = router;
