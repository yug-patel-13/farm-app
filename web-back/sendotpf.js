const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yug.patel.sings01@gmail.com',
    pass: 'xrxnqefrvnvmzocp',
  }
})

app.post('/send-buy', async (req, res) => {
  const { name,number,email,buyerName, buyerEmail } = req.body;
 
  const otp = generateOTP();


  const message = `
  Hello ${buyerName},

  ${name} wants to contract with you.

  Their details are:
  - Number: ${number}
  - Email: ${email}

  farmer wait for your call or email..

  Hope your contract will be successful.
`;


  try {
    await transporter.sendMail({
      from: 'yug.patel.sings01@gmail.com',
      to: buyerEmail,
      subject: 'Your email verification',
      text: message // Corrected property name here
    });
    res.json({ success: true,otp:otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.json({ success: false, error: 'Failed to generate OTP' });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
