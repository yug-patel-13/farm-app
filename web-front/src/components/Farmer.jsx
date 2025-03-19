import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Farmer.css'; // Custom styling file


const gujaratDistricts = [
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'
];

const Farmer = () => {
  const [formType, setFormType] = useState(''); // State to manage form selection
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filteredBuyers, setFilteredBuyers] = useState([]); // State for filtered buyers
  const [ setFilteredfarmers] = useState([]); // State for filtered buyers
  const [farmers, setFarmers] = useState([]); // State to store farmer data
  const [buyers, setBuyers] = useState([]); // State to store buyer data

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    const a = document.getElementById("datas");
    a.style.display = "flex";


    const filtered = buyers.filter((buyer) => {
      return buyer.district === event.target.value && buyer.requiredCrop === cropName;
    });
    setFilteredBuyers(filtered);
  };
  const handleDistrictChange2 = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
  
    const a = document.getElementById("datas2");
    a.style.display = "flex";
  
    // Check if the cropName is defined for filtering farmers
    const filtered2 = farmers.filter((farmer) => {
      return farmer.district === selectedDistrict && farmer.cropName === cropName;
    });
  
    setFilteredfarmers(filtered2);
  };
  

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [cropName, setCropName] = useState('');
  const [cropQuantity, setCropQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Buyer form states
  const [buyerName, setBuyerName] = useState('');
  const [buyerNumber, setBuyerNumber] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [requiredCrop, setRequiredCrop] = useState('');
  const [requiredQuantity, setRequiredQuantity] = useState('');

const [veri,setveri]=useState(false)
const [tru,settru]=useState(false)
const [onetime,setonetime]=useState(false)
const [otp,setotp]=useState("")
const [btn,setbtn]=useState(false)
const [btnDisabled, setBtnDisabled] = useState(false);
const [timeLeft, setTimeLeft] = useState(0);

const [verii,setverii]=useState(false)
const [truu,settruu]=useState(false)
const [onetimee,setonetimee]=useState(false)
const [otppp,setotppp]=useState("")
const [btnnn,setbtnnn]=useState(false)
const [btnDisabledd, setBtnDisabledd] = useState(false);
const [timeLeftt, setTimeLeftt] = useState(0);

  // Fetch farmer and buyer data
  useEffect(() => {
    const fetchFarmersAndBuyers = async () => {
      try {
        const farmerResponse = await axios.get('https://farm-app-mnqq.vercel.app/farmer');
        setFarmers(farmerResponse.data);

        const buyerResponse = await axios.get('https://farm-app-mnqq.vercel.app/buyer');
        setBuyers(buyerResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchFarmersAndBuyers();
  }, []);

  // Validation and form submission logic for farmer
  const handleFarmerSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !number || number.length !== 10 || !email || !cropName || !cropQuantity || !price || !selectedDistrict) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('https://farm-app-mnqq.vercel.app/farmer', {
        name,
        number,
        email,
        cropName,
        cropQuantity,
        price,
        district: selectedDistrict,
        description,
      });

      if (response.data.success) {
        alert('Farmer information submitted successfully!');
        // Reset form
        setName('');
        setNumber('');
        setEmail('');
        setCropName('');
        setCropQuantity('');
        setPrice('');
        setDescription('');
        setSelectedDistrict('');
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        alert('Error: No response received from server.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  }

 
  const handleBuyerSubmit = async (e) => {
    e.preventDefault();

    if (!buyerName || !buyerNumber || buyerNumber.length !== 10 || !buyerEmail || !requiredCrop || !requiredQuantity || !selectedDistrict) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const response = await axios.post('https://farm-app-mnqq.vercel.app/buyer', {
        buyerName,
        buyerNumber,
        buyerEmail,
        requiredCrop,
        requiredQuantity,
        district: selectedDistrict,
      });

      if (response.data.success) {
        alert('Buyer information submitted successfully!');
        // Reset form
        setBuyerName('');
        setBuyerNumber('');
        setBuyerEmail('');
        setRequiredCrop('');
        setRequiredQuantity('');
        setSelectedDistrict('');
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        alert('Error: No response received from server.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  }


const send_buyer=async()=>{

    try {
      const response = await axios.post('https://farm-app-mnqq.vercel.app/send-buy', { name,number,email, buyerEmail,buyerName});
  if(!name||!email)
  {
    alert("please fill the name or email");
    return;
  }
      if (response.data.success) {
       
        console.log("OTP sent to email:", response.data.otp); // Debug log for OTP
        
        alert('OTP sent to your email');
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP, please try again.');
    }
  
}
const handleMouseEnter = (email, name) => {
  setBuyerEmail(email);
  setBuyerName(name);
};

const ot=async()=>{

  try{
  const response=await axios.post('https://farm-app-mnqq.vercel.app/sendotp', {email})
  if(!email){
    alert("enter email")
    return;
  }
  if(response.data.success){
    alert("OTP sent to your email")
    setveri(true)
    setotp(response.data.otp)
    setTimeLeft(60); // Start timer
        setBtnDisabled(true);
  }
  }
  catch(error){
    alert("failed to send otp")
  }
}
useEffect(()=>{
  
  if(timeLeft>0){
    setTimeout(()=>setTimeLeft(timeLeft-1),1000)
      

  }
  else{
    setBtnDisabled(false)
    setveri(false)
  }
  return
},[timeLeft])
const verifyit=()=>{
  if(onetime!==otp)
  {
    alert("wrong otp")
    return;
  }
  else{
    settru(true)
    setbtn(true)
  }

}
const ott=async()=>{

  try{
  const responsee=await axios.post('https://farm-app-mnqq.vercel.app/sendotpp', {buyerEmail})
  if(!buyerEmail){
    alert("enter email")
    return;
  }
  if(responsee.data.success){
    alert("OTP sent to your email")

    setverii(true)
    setotppp(responsee.data.otppp)
    setTimeLeftt(60); // Start timer
    setBtnDisabledd(true);
  }
  }
  catch(error){
    alert("failed to send otp")
  }
}
useEffect(()=>{
  
  if(timeLeftt>0){
    setTimeout(()=>setTimeLeftt(timeLeftt-1),1000)
      

  }
  else{
    setBtnDisabledd(false)
    setverii(false)
  }
  return
},[timeLeftt])
const verifyitt=()=>{
  if(onetimee!==otppp)
  {
    alert("wrong otp")
    return;
  }
  else{
    settruu(true)
    setbtnnn(true)
  }

}
  return (
    <>
      <div id="formSelection">
        <h3 style={{ color: "white" }}>Select Form:</h3>
        <button onClick={() => setFormType('farmer')}>Farmer</button>
        <button onClick={() => setFormType('buyer')}>Buyer</button>
      </div>

      {/* Farmer's Form */}
      {formType === 'farmer' && (
        <form id="infocont" onSubmit={handleFarmerSubmit}>
          <h2>Farmer's Form</h2>
          <div id="name">
            <h3>Name:</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div id="number">
            <h3>Number:</h3>
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter your contact number"
            />
          </div>
          <div id="email">
            <h3>Email:</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button
        type="button"
        onClick={ot}
        disabled={btnDisabled}
        style={{ background: btnDisabled ? "gray" : "green", color: "white", height: "30px", width: "150px" }}
      >
        {btnDisabled ? `Resend in ${timeLeft}s` : "Send OTP"}
      </button>
            {veri && (
              <div>
                <input type="number" value={onetime} onChange={(e)=>setonetime(e.target.value)}/>
                <button type='button' onClick={verifyit}  style={{background:"green", color:"white" ,height:"30px",width:"70px"}}>verify otp</button>
              </div>
           
            )}
               {tru && (

<h4 style={{color:"green"}}>verified</h4>
)}
          </div>
          <div id="cropn">
            <h3>Crop Name:</h3>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
            >
              <option value="">Select crop</option>
              <option value="cotton">Cotton</option>
              <option value="groundnut">Groundnut</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="bajra">Bajra (Pearl Millet)</option>
              <option value="jowar">Jowar (Sorghum)</option>
              <option value="sesame">Sesame</option>
              <option value="tobacco">Tobacco</option>
              <option value="maize">Maize</option>
              <option value="pulses">Pulses</option>
              <option value="castor">Castor</option>
              <option value="mustard">Mustard</option>
              <option value="chickpea">Chickpea</option>
            </select>
          </div>
          <div id="cropq">
            <h3>Crop Quantity (in kg):</h3>
            <input
              type="number"
              value={cropQuantity}
              onChange={(e) => setCropQuantity(e.target.value)}
              placeholder="Enter the quantity in kg"
            />
          </div>
          <div id="price">
            <h3>Price (per kg):</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter the price per kg"
            />
          </div>
          <div id="description">
            <h3>Description:</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter any additional information about the crop"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label htmlFor="district-select">Select District:</label>
            <select id="district-select" value={selectedDistrict} onChange={handleDistrictChange}>
              <option value="">--Please choose an option--</option>
              {gujaratDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {btn &&(<button type="submit" style={{background:"green", color:"white" ,height:"30px",width:"70px"}}>Submit</button>)}
        </form>
      )}

      {formType === 'buyer' && (
        <form id="infocont" onSubmit={handleBuyerSubmit}>
          <h2>Buyer's Form</h2>
          <div id="name">
            <h3>Name:</h3>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div id="number">
            <h3>Number:</h3>
            <input
              type="tel"
              value={buyerNumber}
              onChange={(e) => setBuyerNumber(e.target.value)}
              placeholder="Enter your contact number"
            />
          </div>
          <div id="email">
            <h3>Email:</h3>
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="Enter your email"
              id='eml'
              
            />
            <button type='button' onClick={ott} disabled={btnDisabledd} style={{background:btnDisabledd?"gray":"green", color:"white" ,height:"30px",width:"100px"}}> {btnDisabledd? `resend in ${timeLeftt}s`:"sendotp"}</button>
            {verii && (
              <div>
                <input type="number" value={onetimee} onChange={(e)=>setonetimee(e.target.value)}/>
                <button type='button' onClick={verifyitt}  style={{background:"green", color:"white" ,height:"30px",width:"70px"}}>verify otp</button>
              </div>
           
            )}
               {truu && (

<h4 style={{color:"green"}}>verified</h4>
)}
            
          </div>
          <div id="cropn">
            <h3>Required Crop Name:</h3>
            <select
  value={requiredCrop}
  onChange={(e) => setRequiredCrop(e.target.value)} 
>

              <option value="">Select crop</option>
              <option value="cotton">Cotton</option>
              <option value="groundnut">Groundnut</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="bajra">Bajra (Pearl Millet)</option>
              <option value="jowar">Jowar (Sorghum)</option>
              <option value="sesame">Sesame</option>
              <option value="tobacco">Tobacco</option>
              <option value="maize">Maize</option>
              <option value="pulses">Pulses</option>
              <option value="castor">Castor</option>
              <option value="mustard">Mustard</option>
              <option value="chickpea">Chickpea</option>
            </select>
          </div>
          <div id="cropq">
            <h3>Required Quantity (in kg):</h3>
            <input
              type="number"
              value={requiredQuantity}
              onChange={(e) => setRequiredQuantity(e.target.value)}
              placeholder="Enter the quantity in kg"
            />
          </div>
          <div>
            <label htmlFor="district-select">Select District:</label>
            <select id="district-select" value={selectedDistrict} onChange={handleDistrictChange2}>
              <option value="">--Please choose an option--</option>
              {gujaratDistricts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {btnnn &&<button type="submit">Submit</button>}
        </form>
      )}

<div id="datas">
  <h3>Filtered Buyers:</h3>
  {filteredBuyers.length === 0 ? (
    <p>No buyers found for the selected crop and district.</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Required Crop</th>
          
          <th>District</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredBuyers.map((buyer, index) => (
          <tr key={index} >
            <td>{buyer.buyerName}</td>
            <td>{buyer.requiredCrop}</td>
          
            <td>{buyer.district}</td>
            <td>
              <button id='sendbuy'
                onClick={send_buyer}
                onMouseEnter={() => handleMouseEnter(buyer.buyerEmail, buyer.buyerName)}
              >
                Contract with {`${buyer.buyerName}`}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    </>
  );
};

export default Farmer;
