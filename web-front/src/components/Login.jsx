import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Login = ({setloginchange}) => {
  const [t]=useTranslation("global")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpp,setotpp] = useState(false)
  const [hereotp,sethere]=useState("")
  const [otp,setotp]=useState("")
  const [ver,setver]=useState(false)
  const [sub,setsub]=useState(false)

  const navigate = useNavigate();


  const handleSubmit = async () => {
    if(!name || !email || !password){

      alert("please fill the full information")
      return
      
    }
    const a=document.getElementById("pas")
    if(password!==a)
    {
      alert("password not matched")
    }
    else{
      navigate("/Farmer");
      alert("login successfully")

    }
    setloginchange("welcome")

    try {
      const response = await axios.post("http://localhost:3111/api/agritech", {
        name,
        email,
        password,
      });
      
      if (response.status === 200) {
        
        setEmail('');
        setName('');
        setPassword('');
      } else {
       alert("invalid")
      }
    } catch (err) {
    alert("error occures")
    }
  };
const verif=async()=>{
  try {
    const response = await axios.post('http://localhost:5555/sendotp', {email});
if(!email)
{
  alert("please fill the name or email");
  return;
}
    if (response.data.success) {
     
      console.log("OTP sent to email:", response.data.otp); // Debug log for OTP
      
      alert('OTP sent to your email');
      setotpp(true)
      setotp(response.data.otp)

    } else {
      alert('Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    alert('Error sending OTP, please try again.');
  }


}
const verify=()=>{
  if(hereotp===otp){
setver(true)

setsub(true)
  }
  else{
    alert("wrong otp")
  }
}


  return (
    <div id='boxpass'>
      <div id="namebox">
        <h1>{t("loginnn.name")}</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='enter the name'/>
      </div>

      <div id="emailbox">
        <h1>{t("loginnn.email")}</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter the email and verify'/>
        <button onClick={verif} id='sended'>send OTP</button>
       
      </div>
      {otpp &&(
        <div>

<input type="number" id='otpenter' value={hereotp} onChange={(e)=>sethere(e.target.value)} placeholder='verify here '/>
<button onClick={verify} id='sended'>verify otp</button>
{ver &&(
<h2 style={{color:"green"}}>--verified email--</h2>
)}
        </div>
      )}


      <div id="passbox">
        <h1>{t("loginnn.password")}</h1>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" id='pas' placeholder='re-enter the password'/>
      </div>
{sub &&(
      <div id="btnbox">
       <button onClick={handleSubmit} id='bbutton' style={{height:"30px",width:"70px",background:"green",color:"white"}}>Submit</button>
      </div>
)}
      <Link to="/Loginn">{t("loginnn.already")}</Link>

    
    </div>
  
  );
};

export default Login;
