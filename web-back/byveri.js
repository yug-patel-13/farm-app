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

app.post("/sendotpp", async (req, res) => {
  const { buyerEmail } = req.body;

  if (!buyerEmail) {
    return res.json({ success: false, error: "Buyer email is required!" });
  }

  const otppp = generateOTP();
  const message = `
    Confirm your email with this OTP:
    ${otppp}
  `;

  try {
    await transporter.sendMail({
      from: "yug.patel.sings01@gmail.com",
      to: buyerEmail,
      subject: "Email Verification OTP",
      text: message,
    });

    res.json({ success: true, otppp: otppp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.json({ success: false, error: "Failed to generate OTP" });
  }
});

module.exports = app;
