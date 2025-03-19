const express=require("express")
const cors=require("cors")
const nodemailer=require("nodemailer")

const app=express()
app.use(cors())
app.use(express.json())

const generateOTP=()=>{
    return Math.floor(1000+Math.random()*9000).toString()
}

const transporter=nodemailer.createTransport({

    service:'Gmail',
    auth:{
        user: 'yug.patel.sings01@gmail.com',
        pass: 'xrxnqefrvnvmzocp',
    }
})

app.post('/sendotp',async(req,res)=>{
    const {email } = req.body;
    const otp=generateOTP();
    const message=`
    
    Confirm your email id with this OTP
    ${otp}

    `

    try {
        await transporter.sendMail({
          from: 'yug.patel.sings01@gmail.com',
          to: email,
          subject: 'Your email verification',
          text: message // Corrected property name here
        });
        res.json({ success: true,otp:otp });
      } catch (error) {
        console.error('Error sending OTP:', error);
        res.json({ success: false, error: 'Failed to generate OTP' });
      }
    });
    
    module.exports = app;