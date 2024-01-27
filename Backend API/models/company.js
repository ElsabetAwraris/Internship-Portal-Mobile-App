// companyModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  address: {
    type: String,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  confirmation: {
    type: String,
  },

  interns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  expoToken: {
    type: String,
  },
});

// Method to add a Intern to the 'interns' array if not already present
companySchema.methods.addIntern = function (internId) {
  if (!this.interns.includes(internId)) {
    this.interns.push(internId);
    return this.save();
  } else {
    return Promise.resolve(this);
  }
};
const Company = mongoose.model("Company", companySchema);
module.exports = Company;
