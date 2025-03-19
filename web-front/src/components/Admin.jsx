import axios from "axios";
import React, { useState } from "react";
import "./Login.css"
const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [adMail, setAdMail] = useState("");
  const [adPass, setAdPass] = useState("");
  const [adminData, setAdminData] = useState([]);

  const subAdmin = async () => {
    try {
      // Validate admin credentials (hardcoded for now; avoid this in production)
      if (adMail === "agritech@project.com" && adPass === "20052008") {
        setIsLogin(false);
        setIsAdmin(true);
        await fetchDatas();
      } else {
        alert("Wrong email or password");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchDatas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/farmer"); // Replace with your endpoint
      setAdminData(response.data); // Save fetched data in state
    } catch (err) {
      console.error("Error fetching admin data:", err);
      alert("Failed to fetch admin data.");
    }
  };

  return (
    <div>
      {isLogin && (
        <div id="loginbox">
          <div id="loginbox1">
            <h1 id="logmail">E-mail</h1>
            <input
              type="email"
              value={adMail}
              onChange={(e) => setAdMail(e.target.value)}
              id="mailval"
            />
          </div>
          <div>
            <h1>Password</h1>
            <input
              type="password"
              value={adPass}
              onChange={(e) => setAdPass(e.target.value)}
              id="passval"
            />
          </div>
          <div>
            <button id="adsub" onClick={subAdmin}>
              Submit
            </button>
          </div>
        </div>
      )}
      {isAdmin && (
        <div className="admin-section">
          <h1 className="admin-title" style={{color:"white"}}>Admin Panel: Saved Data</h1>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{color:"black"}}>Name</th>
                <th style={{color:"black"}}>Email</th>
                <th style={{color:"black"}}>Crop Name</th>
                <th style={{color:"black"}}>City</th>
               
                
                <th style={{color:"black"}}>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((item, index) => (
                <tr key={index} className="admin-row">
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.cropname}</td>
                  <td>{item.district}</td>
                 
                  <td>{item.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
