import React, { useState } from 'react';
import "./Help.css";
import { Link } from 'react-router-dom';

const Help = () => {
  const [selectedOption, setSelectedOption] = useState(''); // Track the selected radio button

  const handleSelection = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div id="partpado">
        <div><img src="farmer.jpg" alt="farmer" id="f1" /></div>
        <div id="select">
          <h1 id="iam">I am a </h1>
          
          <h1>
            <label htmlFor="farmer">
              <input 
                type="radio" 
                name="userType" 
                value="farmer" 
                onChange={handleSelection} 
                id="fm" 
              />
              Farmer
            </label>
          </h1>
          
          <h1>
            <label htmlFor="buyer">
              <input 
                type="radio" 
                name="userType" 
                value="buyer" 
                onChange={handleSelection} 
                id="br" 
              />
              Buyer
            </label>
          </h1>
          
          {/* Conditionally render the Link components based on the selected radio button */}
          {selectedOption === 'farmer' && (
            <Link to="/farmer" id="btn1">
              <button id='entf'>Enter as a Farmer</button>
            </Link>
          )}
          
          {selectedOption === 'buyer' && (
            <Link to="/buyer" id="btn2">
              <button id='entb'>Enter as a Buyer</button>
            </Link>
          )}
        </div>
        <div><img src="buyer.jpg" alt="buyer" id="f2" /></div>
      </div>
      <footer>
      <div className="footer-container">
        <div className="footer-about">
          <h2>About Us</h2>
          <p>
            Farmer Helper is dedicated to empowering farmers with the tools they need to succeed in the agricultural industry. Our platform connects farmers with buyers, ensures transparent contracts, and supports price negotiations.
          </p>
        </div>

        <div className="footer-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h2>Contact Us</h2>
          <p>Email: support@farmerhelper.com</p>
         
         
        </div>

        <div className="footer-social">
          <h2>Follow Us</h2>
          <a href="/helo"><img src="facebook-icon.png" alt="Facebook" /></a>
          <a href="/helo"><img src="twitter-icon.png" alt="Twitter" /></a>
          <a href="/helo"><img src="instagram-icon.png" alt="Instagram" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AgriMitra. All Rights Reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default Help;
