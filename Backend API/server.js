// Import necessary libraries/modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const path = require("path");

const user = require("./routes/users");
const internship = require("./routes/internship");
const company = require("./routes/company");
const application = require("./routes/application");
const chat = require("./routes/chat");
const fs = require("fs");
const { log } = require("console");

const app = express();
const port = 8000;
app.use(cors());

// middleware
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("uploads"));
const resumeDirectory = path.join(__dirname, "uploads");

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/internship_portal")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection failed!", error.message);
  });

app.use("/portal/user", user);
app.use("/portal/internship", internship);
app.use("/portal/company", company);
app.use("/portal/application", application);
app.use("/portal/chat", chat);

app.get("/resumes/uploads/:resumeName", (req, res) => {
  const { resumeName } = req.params;

  if (!resumeName) {
    return res.status(404).json({ error: "Resume not found" });
  }

  const filePath = path.join(__dirname, "uploads", resumeName);
  console.log(filePath);
  // if (!fs.existsSync(filePath)) {
  //   return res.status(404).json({ error: "Resume not found" });
  // }

  res.status(200).json({ filePath });
});
