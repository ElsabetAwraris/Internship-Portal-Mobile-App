// companyController.js
const jwt = require("jsonwebtoken");
const Company = require("../models/company");
const mongoose = require("mongoose");
const Chat = require("../models/chat");
const User = require("../models/users");

const createToken = (_id) => {
  return jwt.sign({ _id }, "my-jwt", { expiresIn: "3d" });
};

const getCompany = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such company" });
  }
  const company = await Company.findById(id);

  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }
  res.status(200).json(company);
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching companies", details: error.message });
  }
};

const createCompany = async (req, res) => {
  const { companyName, industry, address, phoneNumber, password, email } =
    req.body;
  console.log(companyName);
  try {
    const newCompany = new Company({
      companyName,
      industry,
      address,
      phoneNumber,
      password,
      email,
      role: "company",
    });

    await newCompany.save();

    res
      .status(201)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Company creation failed", details: error.message });
  }
};

// Define a placeholder loginCompany function
const loginCompany = async (req, res) => {
  const { email, password, myToken } = req.body;
  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(401).json({ message: "Company not found" });
    }

    if (company.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    company.expoToken = myToken;
    await company.save();

    const _id = company._id;
    const role = "company";

    const token = createToken(company._id);
    res.status(200).json({ token, _id, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};
const getInterns = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const internsIds = company.interns.map((intern) => intern.toString());

    const interns = await User.find({ _id: { $in: internsIds } });

    const internsWithStatus = await Promise.all(
      interns.map(async (intern) => {
        const recentMessage = await Chat.findOne({
          $or: [
            { sender: intern._id, recipient: company._id },
            { sender: company._id, recipient: intern._id },
          ],
        })
          .sort({ timestamp: -1 })
          .limit(1);

        return {
          ...intern.toObject(),
          recentMessage: recentMessage ? recentMessage.toObject() : null,
        };
      })
    );

    res.status(200).json({ interns: internsWithStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCompany,
  loginCompany,
  getCompanies,
  getCompany,
  getInterns,
};
