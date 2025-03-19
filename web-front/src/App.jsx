import React, { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import "./App.css"
import Navbar from './components/Navbar'
import Help from './components/Help'
import Farmer from './components/Farmer'
import Login from './components/Login'
import AboutUs from './components/Aboutus'
import Benifits from './components/Benifits'
import Loginn from './components/Loginn'
import Admin from './components/Admin'






const App = () => {
  const [ogin,setogin]=useState(false)
  const [loginchange,setloginchange]=useState("Login")



  return (
    <>
    <div>
      <Router>
        <Navbar ogin={ogin} loginchange={loginchange} />
      
        <Routes>
 
      <Route path='/help' element={<Help/>}></Route>
      <Route path='/farmer' element={<Farmer/>}></Route>
      <Route path='/login' element={<Login  setogin={setogin} setloginchange={setloginchange}/>}></Route>
    
      <Route path='/aboutus' element={<AboutUs/>}></Route>

      <Route path='/demo' element={<Benifits/>}></Route>
      <Route path='/Loginn' element={<Loginn setloginchange={setloginchange}/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
   
        </Routes>
     

    <div id="ftr">
    <footer>
     <div className="footer-container">
       <div className="footer-about">
         <h2 style={{color:"white"}}>About Us</h2>
         <p>
           Farmer Helper is dedicated to empowering farmers with the tools they need to succeed in the agricultural industry. Our platform connects farmers with buyers, ensures transparent contracts, and supports price negotiations.
         </p>
       </div>

       <div className="footer-links">
         <h2 style={{color:"white"}}>Quick Links</h2>
         <ul>
           <li><Link to="/content">Home</Link></li>
           <li><Link to="/product">Products</Link></li>
           <li><Link to="/aboutus">About Us</Link></li>
           <li><Link to="/contact">Contact</Link></li>
           <li><Link to="/login" >Login</Link></li>
         </ul>
       </div>

       <div className="footer-contact">
         <h2 style={{color:"white"}}>Contact Us</h2>
         <p>Email: yug.patel.sings01@gmail.com</p>
         
       </div>

     
     </div>
     <div className="footer-bottom">
       <p>&copy; 2024 AgriMitra. All Rights Reserved.</p>
     </div>
   </footer>
    </div>
    </Router>
  
  </div>
  </>
  );
};

export default App
