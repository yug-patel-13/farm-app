import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = ({ setloginchange }) => {
  const [t] = useTranslation("global");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpp, setotpp] = useState(false);
  const [hereotp, sethere] = useState("");
  const [otp, setotp] = useState("");
  const [ver, setver] = useState(false);
  const [sub, setsub] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all the details.");
      return;
    }

    const confirmPassword = document.getElementById("pas").value;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('farm-app-nine.vercel.app/api/agritech', {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setEmail('');
        setName('');
        setPassword('');
        setloginchange("welcome");
        navigate("/Farmer");
        alert("Login successful!");
      } else {
        alert("Invalid credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("An error occurred while logging in.");
    }
  };

  const sendOTP = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoadingOTP(true);
      const response = await axios.post('farm-app-nine.vercel.app/sendotp', { email }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.data.success) {
        console.log("OTP sent:", response.data.otp);
        alert("OTP has been sent to your email.");
        setotpp(true);
        setotp(response.data.otp);
      } else {
        alert("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    } finally {
      setLoadingOTP(false);
    }
  };

  const verifyOTP = () => {
    if (hereotp.toString() === otp.toString()) {
      setver(true);
      setsub(true);
      alert("OTP verified successfully!");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div id='boxpass'>
      <div id="namebox">
        <h1>{t("loginnn.name")}</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
      </div>

      <div id="emailbox">
        <h1>{t("loginnn.email")}</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
        <button onClick={sendOTP} id='sended' disabled={loadingOTP}>
          {loadingOTP ? "Sending..." : "Send OTP"}
        </button>
      </div>

      {otpp && (
        <div>
          <input type="number" id='otpenter' value={hereotp} onChange={(e) => sethere(e.target.value)} placeholder='Enter OTP' />
          <button onClick={verifyOTP} id='sended'>Verify OTP</button>
          {ver && <h2 style={{ color: "green" }}>✔ Email Verified</h2>}
        </div>
      )}

      <div id="passbox">
        <h1>{t("loginnn.password")}</h1>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
        <input type="password" id='pas' placeholder='Re-enter password' />
      </div>

      {sub && (
        <div id="btnbox">
          <button onClick={handleSubmit} id='bbutton' style={{ height: "30px", width: "70px", background: "green", color: "white" }}>Submit</button>
        </div>
      )}

      <Link to="/Loginn">{t("loginnn.already")}</Link>
    </div>
  );
};

export default Login;
