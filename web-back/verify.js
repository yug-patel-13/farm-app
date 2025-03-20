const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "yug.patel.sings01@gmail.com",
    pass: "xrxnqefrvnvmzocp",  // ❌ SECURITY WARNING: DO NOT STORE PASSWORDS IN CODE! Use environment variables.
  },
});

app.post("/sendotp", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://farm-app-fk44.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") return res.sendStatus(200); // ✅ Handle preflight requests

  const { email } = req.body;
  if (!email) return res.json({ success: false, error: "Email is required!" });

  const otp = generateOTP();
  const message = `Confirm your email with this OTP: ${otp}`;

  try {
    await transporter.sendMail({
      from: "yug.patel.sings01@gmail.com",
      to: email,
      subject: "Email Verification OTP",
      text: message,
    });

    res.json({ success: true, otp: otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
});

module.exports = app;
