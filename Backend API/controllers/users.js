const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Chat = require("../models/chat");
const Company = require("../models/company");
const sendEmail = require("./mailController");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, "my-jwt", { expiresIn: "3d" });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such user" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "No such user" });
  }
  res.status(200).json(user);
};

// login user
const loginUser = async (req, res) => {
  const { email, password, myToken } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const _id = user._id;
    const role = user.role;
    user.expoToken = myToken;

    console.log(myToken);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ token, _id, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, phoneNumber, university, major, email, password } = req.body;
    console.log(name, phoneNumber, university, major, email, password);

    const newUser = new User({
      name,
      phoneNumber,
      university,
      major,
      role: "intern",
      email,
      password,
    });

    await newUser.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", details: error.message });
  }
};
const getCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const companyData = user.company;

    const companyIds = companyData.map((company) => company.toString());
    const companies = await Company.find({ _id: { $in: companyIds } });

    const companiesWithStatus = await Promise.all(
      companies.map(async (company) => {
        const recentMessage = await Chat.findOne({
          $or: [
            { sender: company._id, recipient: user._id },
            { sender: user._id, recipient: company._id },
          ],
        })
          .sort({ timestamp: -1 })
          .limit(1);

        return {
          ...company.toObject(),
          recentMessage: recentMessage ? recentMessage.toObject() : null,
        };
      })
    );

    res.status(200).json({ companies: companiesWithStatus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const passwordSetting = async (req, res) => {
  const { password, email, role } = req.body;
  try {
    if (role === "compnay") {
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(401).json({ message: "Company not found" });
      }
      company.password = password;
      await company.save();
      res.status(200).json({ message: "Password updated succeccfully" });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      user.password = password;
      await user.save();
      res.status(200).json({ message: "Password updated succeccfully" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};

const confirmationEmail = async (req, res) => {
  const { email, role } = req.body;
  try {
    if (role === "company") {
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(401).json({ message: "Company not found" });
      }
      const code = Math.floor(1000 + Math.random() * 9000);
      await sendEmail(email, code);
      company.confirmation = code;
      const updatedCompany = await company.save();
      return res.status(200).json({ updatedCompany });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      const code = Math.floor(1000 + Math.random() * 9000);
      await sendEmail(email, code);
      user.confirmation = code;
      const updatedUser = await user.save();
      return res.status(200).json({ updatedUser });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};

// send confirmation code
const confirmCode = async (req, res) => {
  const { email, code, role } = req.body;

  try {
    if (role === "intern") {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.confirmation !== code) {
        return res.status(404).json({ message: "Invalid Code" });
      }
    }
    if (role === "company") {
      const company = await Company.findOne({ email: email });

      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      if (company.confirmation !== code) {
        return res.status(404).json({ message: "Invalid Code" });
      }
    }

    return res.status(200).json({ message: "Correct Code" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword, role } = req.body;

  try {
    if (role === "intern") {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      user.password = newPassword;
      user.confirmation = null;
      await user.save();
      res.status(200).json({ message: "Password reset successfully" });
    }
    if (role === "company") {
      const company = await Company.findOne({ email: email });

      if (!company) {
        return res.status(401).json({ message: "Company not found" });
      }

      company.password = newPassword;
      company.confirmation = null;
      await company.save();
      res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Error" });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, major, companyName, address, phoneNumber, role } = req.body;
    console.log(role);
    if (role === "company") {
      const company = await Company.findById(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      company.companyName = companyName || company.companyName;
      company.address = address || company.address;
      company.phoneNumber = phoneNumber || company.phoneNumber;

      const updateCompany = await company.save();

      res.status(200).json(updateCompany);
    } else {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name || user.name;
      user.major = major || user.major;
      user.phoneNumber = phoneNumber || user.phoneNumber;

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// change Password method
const changePassword = async (req, res) => {
  const { id, currentPassword, newPassword, role } = req.body;

  try {
    if (role === "company") {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such Company" });
      }
      const company = await Company.findById(id);
      if (!company) {
        return res.status(401).json({ message: "Company not found" });
      }
      if (company.password !== currentPassword) {
        return res.status(401).json({ message: "Incorrect Password" });
      }
      company.password = newPassword;
      await company.save();
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "No such user" });
      }
      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.password !== currentPassword) {
        return res.status(401).json({ message: "Incorrect Password" });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error" });
  }
};

// Update email details
const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;

  try {
    if (role === "company") {
      const company = await Company.findById(id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      company.email = email || company.email;
      const updatedCompany = await company.save();
      return res.json(updatedCompany);
    } else {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.email = email || user.email;
      const updatedUser = await user.save();
      return res.json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCompany,
  passwordSetting,
  confirmationEmail,
  confirmCode,
  resetPassword,
  getUser,
  updateUserInfo,
  updateEmail,
  changePassword,
};
