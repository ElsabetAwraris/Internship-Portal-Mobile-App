const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  university: {
    type: String,
  },

  major: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmation: {
    type: String,
  },
  company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
  expoToken: {
    type: String,
  },
});

// Method to add a Company to the 'company' array if not already present
userSchema.methods.addCompany = function (companyId) {
  if (!this.company.includes(companyId)) {
    this.company.push(companyId);
    return this.save();
  } else {
    // Company already exists, do nothing
    return Promise.resolve(this);
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
