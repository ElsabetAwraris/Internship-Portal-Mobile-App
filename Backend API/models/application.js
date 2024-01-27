const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  applier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  application_date: {
    type: Date,
    required: true,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  application_status: {
    type: String,
    required: true,
  },
  essay: {
    type: String,
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
