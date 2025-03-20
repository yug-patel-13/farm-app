import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Loginn = ({ setloginchange }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [t] = useTranslation("global");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://farm-app-nine.vercel.app/api/agritech/login",
        { email: loginEmail, password: loginPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert("Successful login");
        setLoginEmail("");
        setLoginPassword("");
        navigate("/Farmer");
        setloginchange("welcomee");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div id="loginn">
        <div id="emailbox">
          <h1>{t("loginnn.email")}</h1>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div id="passbox">
          <h1>{t("loginnn.password")}</h1>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div id="btnbox">
          <button
            onClick={handleLogin}
            style={{
              height: "30px",
              width: "70px",
              background: "green",
              color: "white",
            }}
          >
            Login
          </button>

          <Link to="/admin">
            <button
              style={{
                height: "30px",
                width: "110px",
                background: "green",
                color: "white",
                marginLeft: "10px",
              }}
            >
              Login as Admin
            </button>
          </Link>
        </div>

        <Link to="/register">{t("loginnn.new")}</Link>
      </div>
    </div>
  );
};

export default Loginn;
