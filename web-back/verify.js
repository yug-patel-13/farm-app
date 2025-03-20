const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variables
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/sendotp", async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required!" });
  }

  const otp = generateOTP();
  const message = `Confirm your email with this OTP:\n${otp}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: message,
    });

    res.json({ success: true, otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

// Start the server
const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
