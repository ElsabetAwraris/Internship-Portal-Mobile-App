const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elithabethawraris7575@gmail.com",
    pass: "igsawzgusymbcfdw",
  },
});

const sendEmail = async (receiverEmail, code) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: " Internship Portal Mobile-app 📧 <elithabethawraris7575@gmail.com>",
      to: `${receiverEmail}`,
      subject: "Internship Portal credential 🔑",
      text: `This is your confirmation code ${code} on Internship Portal Web-app \n don't share your cridential with other people.`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
