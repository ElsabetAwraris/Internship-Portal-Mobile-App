const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const internshipSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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
  company: {
    type: String,
  },
  season: {
    type: String,
  },

});

const Internship = mongoose.model("Internship", internshipSchema);
module.exports = Internship;