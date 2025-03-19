import React from 'react';
import './About.css';
import { useTranslation } from 'react-i18next';


const AboutUs = () => {
  const [t] = useTranslation("global");

  
  return (
    <>
      <div className="main-content">
       
        <header className="header">
          <h1>{t("header.welcome_message")}</h1>
          <p>{t("header.description")}</p>
        </header>

        <section className="section">
          <h2>{t("header.vision_title")}</h2>
          <p>{t("header.vision_content")}</p>
        </section>

        <section className="section">
          <h2>{t("header.mission_title")}</h2>
          <p>{t("header.mission_content")}</p>
        </section>

        <section className="section">
          <h2>{t("header.focus_title")}</h2>
          <p>{t("header.focus_content")}</p>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
