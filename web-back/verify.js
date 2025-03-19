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
    pass: "xrxnqefrvnvmzocp",
  },
});

app.post("/sendotp", async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.json({ success: false, error: "Email is required!" });
  }

  const otp = generateOTP();
  const message = `
    Confirm your email with this OTP:
    ${otp}
  `;

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
    res.json({ success: false, error: "Failed to send OTP" });
  }
});

module.exports = app;
