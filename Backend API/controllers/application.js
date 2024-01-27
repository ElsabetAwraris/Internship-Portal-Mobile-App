const Application = require("../models/application");
const Internship = require("../models/internship");
const User = require("../models/users");
const cloudinary = require("../utils/cloudinary");
const sendPushNotification = require("./notificationPusher");

const apply = async (req, res) => {
  try {
    const { applier, internship, essay } = req.body;

    const application_date = new Date();

    const internshipExistance = await Internship.findOne({ _id: internship });
    if (!internshipExistance) {
      return res.status(401).json({ message: "Internship Does not exist" });
    }

    const result = await cloudinary.uploader.upload(req.files.file[0].path, {
      resource_type: "raw",
      format: "pdf",
      folder: "internship",
    });

    const company = internshipExistance.company;
    const application = await Application.findOne({ _id: applier });
    if (application) {
      return res.status(401).json({ message: "User already applied" });
    }

    const newApplication = Application.create({
      applier,
      internship,
      company,
      application_date,
      resume: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      application_status: "submitted",
      essay,
    });
    console.log(newApplication);

    res.status(404).json(newApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const acceptApplication = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }
    if (application.application_status === "Accepted") {
      return res
        .status(300)
        .json({ message: "You have already accept an intern" });
    }

    application.application_status = "Accepted";
    const applier = await User.findById(application.applier);
    console.log(applier);
    sendPushNotification(
      applier.expoToken,
      "You have accepted for Internship",
      "Internship Portal"
    );

    const updatedApplication = await application.save();
    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error accepting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const applications = await Application.find({ company: id })
      .populate("internship", "title")
      .populate("applier", "name");

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for the specified company." });
    }

    const formattedApplications = applications.map((application) => ({
      _id: application._id,
      internshipTitle: application.internship.title,
      applierName: application.applier.name,
      resume: application.resume,
      essay: application.essay,
      status: application.application_status,
    }));

    res.status(200).json(formattedApplications);
  } catch (error) {
    console.error("Error accepting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getMyApplication = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("internship", "title")
      .populate("applier", "name");

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for the specified company." });
    }

    const formattedApplications = applications.map((application) => ({
      _id: application._id,
      internshipTitle: application.internship.title,
      applierName: application.applier.name,
      resume: application.resume,
      essay: application.essay,
      applier: application.applier,
      status: application.application_status,
      company: application.company,
    }));
    res.status(200).json(formattedApplications);
  } catch (error) {
    console.error("Error accepting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  apply,
  acceptApplication,
  getApplication,
  getMyApplication,
};
