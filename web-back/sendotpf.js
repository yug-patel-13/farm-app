const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yug.patel.sings01@gmail.com',
    pass: 'xrxnqefrvnvmzocp',
  }
});

app.post('/send-buy', async (req, res) => {
  const { name, number, email, buyerName, buyerEmail } = req.body;

  if (!name || !number || !email || !buyerName || !buyerEmail) {
    return res.json({ success: false, error: 'All fields are required' });
  }

  const message = `
  Hello ${buyerName},

  ${name} wants to contract with you.

  Their details are:
  - Number: ${number}
  - Email: ${email}

  The farmer is waiting for your call or email.

  Hope your contract will be successful.
  `;

  try {
    await transporter.sendMail({
      from: 'yug.patel.sings01@gmail.com',
      to: buyerEmail,
      subject: 'Farmer Contract Request',
      text: message,
    });
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ success: false, error: 'Failed to send email' });
  }
});

module.exports = app;
