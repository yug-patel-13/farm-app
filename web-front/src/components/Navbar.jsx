import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Nav.css";
import "./Home.css";
import { useTranslation } from 'react-i18next';

const Navbar = ({ ogin ,loginchange}) => {
  const [activeLink, setActiveLink] = useState('home');
  const [showContainer, setShowContainer] = useState(true);
  const [t, i18n] = useTranslation("global");

  const handlang=(lang:string)=>{

    i18n.changeLanguage(lang)

  }


  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (link === 'home') {
      setShowContainer(true);
    } else {
      setShowContainer(false);
    }
  };

  const handleLoginClick2 = () => {
    const a = document.getElementById("login");
    if (a.textContent === t("other.welcome_message")) {
      alert("already signed in");
      return a;
    }
  };

  const handleLoginClick = () => {
    setShowContainer(false);
    setActiveLink('login');
  };


const entermouse=()=>{
  if(loginchange==="Login")
  {
    alert("you need to login first")
    
  }
}
  return (
    <>
      <div className='Nav'>
        <div id="links">
          <div id="lgo"><img src="farlogo.png" alt="logo" style={{ height: "70px" }} id='logo' /></div>
         
 <div>
            <Link to="/content" style={{ textDecoration: "none" }}>
              <h3
                id='l1'
                style={{ color: activeLink === 'home' ? 'yellow' : 'white' }}
                onClick={() => handleLinkClick('home')}
              >
                {t("other.home")}
              </h3>
            </Link>
            </div>
         

          <div>
            <Link to="/aboutus" style={{ textDecoration: "none" }}>
              <h3
                id='l3'
                style={{ color: activeLink === 'aboutus' ? 'yellow' : 'white' }}
                onClick={() => handleLinkClick('aboutus')}
              >
                {t("other.aboutus")}
              </h3>
            </Link>
          </div>

          <div>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button id='login' onClick={handleLoginClick} onMouseEnter={handleLoginClick2}>
                {loginchange}
              </button>
            </Link>
          </div>
          <div id='langbtn'>
  <div><h3 id='cng' style={{color:"white"}}>change Language : </h3></div>
          <button onClick={()=>handlang("en")} id='btn1lan'>english</button>
          <button onClick={()=>handlang("guj")} id='btn2lan'>gujarati</button>
          <button onClick={()=>handlang("hn")} id='btn2lan' style={{background:"yellow",color:"black"}}>hindi</button>
        </div>
          <div></div>
        </div>
        </div>
     
      

      {showContainer && (
        <div id='container' style={{ flexDirection: "column" }}>
          <div id='content'>
            <div id='box'>
              <h1>{t("other.welcome")}</h1>
              <h1 style={{ color: "orange" }}>{t("other.agritech")}</h1>
              <h1 style={{ marginLeft: "40px" }}>{t("other.description")}</h1>
              <ul>
                <h3 style={{ color: "white" }}><li>{t("other.connects")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.secures")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.supports")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.ensures")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.offers")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.priceNegotiation")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.educationalResources")}</li></h3>
                <h3 style={{ color: "white" }}><li>{t("other.feedback")}</li></h3>
              </ul>
            </div>
            <div id="box2">
              <Link to="/farmer" style={{ textDecoration: "none", color: "yellow" }} onClick={handleLinkClick}>
                <div id='copy2' onMouseEnter={entermouse}>
                  <img src="copy2.png" alt="1photo" id='v1p' />
                  <h1 style={{ color: "#1c6a4c" }}>{t("other.startContract")}</h1>
                </div>
              </Link>
              <Link to="/demo" style={{ textDecoration: "none", color: "yellow" }} onClick={handleLinkClick}>
                <div id='copy3'>
                  <img src="copy3.png" alt="1photo" id='b1p' />
                  <h1 style={{ color: "#1c6a4c" }}>{t("other.benefits")}</h1>
                </div>
              </Link>
            </div>
          </div>
         

          <div id='our'>
            <div><h1 id='plate'>{t("other.what_our_platform_offers")}</h1></div>
            <div id='contain'>
              <div id="div1">
                <div id="bx1">
                  <h1 id='mer'>{t("other.farmer")}</h1>
                 
                </div>
                <div id="bx2">
                  <h1 id='mer'>{t("other.buyers")}</h1>
                  
                </div>
                <div id="bx3">
                  <h1 id='mer'>{t("other.payments")}</h1>
                  
                </div>
              </div>
              <div id="div2">
                <div id="bx4">
                  <h1 id='mer' className='ano'>{t("other.contractFarming")}</h1>
                 
                </div>
                <div id="bx5">
                  <h1 id='mer'>{t("other.trackContracts")}</h1>
                  
                </div>
                <div id="bx6">
                  <h1 id='mer'>{t("other.support")}</h1>
                  
                </div>
              </div>
            </div>
          </div>

          <div id="wedo">
            <img src="cro.png" alt="Crop" id="cro" />
          </div>

          <div><h1 id='hiw'>{t("other.hiw")}</h1></div>
          <div id="create">
            <div id="hand">
              <div id="crv1">
                <h1>{t("other.title")}</h1>
                <div><img src="crv1.png" alt="Create a Contract" id='cv' /></div>
                <h4 id='h6' style={{ height: "50px", width: "200px" }}>{t("other.description")}</h4>
              </div>
              <div id="crv2">
                <h1>{t("other.title2")}</h1>
                <img src="crv2.png" alt="Negotiate and Sign" id='cv1' />
                <h4 id='h6' style={{ height: "50px", width: "200px" }}>{t("other.description2")}</h4>
              </div>
              <div id="crv3">
                <h1>{t("other.title3")}</h1>
                <img src="crv3.png" alt="Track and Pay" id='cv2' />
                <h5 id='h6' style={{ height: "30px", width: "250px" }}>{t("other.description3")}</h5>
              </div>
            </div>
          </div>
          <div><h1 id='hiw2'>{t("other.startContract")}</h1></div>
          <div id='join'>{t("other.joinMessage")}</div>
        </div>
      )}
    </>
  );
};

export default Navbar;
