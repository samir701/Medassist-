import React, {useState} from "react";
import "./assets/css/chat.css"; // Import CSS
import "./assets/css/About.css";
import Navbar from "./Navbar";
import ab from './assets/images/adoc1.avif';
import abc from './assets/images/adoc2.jpg';
// import Chatbot from "./Chatbot";

function About() {
    return (
        <div className="about">

            <Navbar />
            <div className="about-top">
                <h1>About MediAssist</h1>
                <p>Your trusted partner in health and healing</p>
            </div>
            <div className="who">
                <h2>Who we are</h2>
                <p>At MedAssist we are committed to delivering high-quality, patent-centeredhealthservices with a dedicated team of experienced doctors, nurses, and healthcare professionals</p>
            </div>
            <div className="who">
                  <h2>Our Mission</h2>
<p>To provide accessible , compassionate, and afferdable healthcare by combining advanced medical technology with personalized treatment in a site, welcoming environment.</p>
            </div>
           <div className="who"><h2>Our Vision</h2>
<p>To provide accessible healthcare for all</p>
<ul className="vision-list">
    <li>24/7 emergency and ambulance service</li>
    <li>Expert mutidisciplinary team</li>
    <li>Digital appointments and consultations</li>
    <li>Personalized care plans for every patient</li>
</ul>
</div>
<h2 className="c2">Meet Our Team</h2>
<div className="about-content">
    <div className="c1">
        <div className="c11">
            <img src={ab} alt="bg" />
        </div>
        <div className="c12">
            <h3>Dr. Asha Roy</h3>
            <p>Chief Medical Officer</p>
        </div>
    </div>
    <div className="c1">
        <div className="c11"><img src={abc} alt="bg" /></div>
        <div className="c12">
            <h3>Dr. Ravi Kumar</h3>
            <p>Head of Diagnostics</p>
        </div>
    </div>
</div>
{/* <Chatbot /> */}
        </div>
    );
}
           
    
export default About;
