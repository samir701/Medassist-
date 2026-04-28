import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./assets/css/App.css";
import doctor from "./assets/images/doctor.avif";
import Navbar from "./Navbar";
import FeedbackForm from "./FeedbackForm";
import Service from "./Service";
import Login from "./Login";
import About from "./About";
import Department from "./Department";
import Medic from "./Medic";
import Doctors from "./Doctors";
import Cardiology from "./Cardiology";
import Neurology from "./Neurology";
import Gynecology from './Gynecology';
import Booking from './Booking';
import login from "./assets/images/login1.png";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider, useAuth } from "./AuthProvider";
import { useNavigate,Navigate } from "react-router-dom";
import Chatbot from "./Chatbot";

export default function App() {
  const [showBot, setShowBot] = React.useState(false);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* root routes */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* main Route */}
          <Route path="/login" element={<Login />} />
          

          {/* potected Route */}
          <Route element={<ProtectedRoute />}>
          <Route
            path="/home"
            element={
              <div>
                {/* Top Section */}
                <div className="top1">
                  <h2 className="official">
                    WELCOME TO THE OFFICIAL PAGE OF MdiAssist++
                  </h2>
                  
                  
                  
                  
                </div>

                {/* Navbar */}
                <Navbar />
                
                {/* Hero Section */}
                <div className="hero-sec">
                  <div className="hero-text">
                    <div className="stext1">Get Better Care For Your Health</div>
                    <div className="stext2">
                      This platform connects patients with doctors while providing
                      reliable resources to support informed healthcare decisions
                    </div>
                  </div>
                  <img src={doctor} alt="doctor" className="hero-img" />
                </div>
                {showBot && <Chatbot onClose={toggleBot} />}
                      {/* // <div className="chatbot-popup">
                      //   <Chatbot />
                      //   <button className="close-bot" onClick={toggleBot}>✖</button>
                      // </div> */}
                      

                    
                {/* 🔥 FLOATING BUTTON */}
                    <button className="floating-bot-btn" onClick={toggleBot}>
                      💬
                    </button>

                {/* Service Cards */}
                <div className="card-cont">
                  <div className="card1">
                    <div className="cardio1">CARDIOLOGY</div>
                    <div className="cardio2">
                      The branch of medicine that focuses on diagnosing, treating,
                      and preventing diseases of the heart and blood vessels.
                    </div>
                    <div className="cardio3">
                      <Link to="/cardiology">{">"}</Link>
                    </div>
                  </div>

                  <div className="card2">
                    <div className="neuro1">NEUROLOGY</div>
                    <div className="neuro2">
                      The medical specialty dedicated to diagnosing and treating
                      disorders of the brain, spinal cord, and nervous system
                    </div>
                    <div className="neuro3">
                      <Link to="/neurology">{">"}</Link>
                    </div>
                  </div>

                  <div className="card3">
                    <div className="gyno1">GYNAECOLOGY</div>
                    <div className="gyno2">
                      The branch of medicine that focuses on the health, diagnosis,
                      and treatment of the female reproductive system.
                    </div>
                    <div className="gyno3">
                      <Link to="/gynecology">{">"}</Link>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="box4">CONTACT US</div>
                <div className="feed">
                  <FeedbackForm />
                  
                    
                    
                  </div>
                </div>
              
            }
          />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/department" element={<Department />} />
          <Route path="/department/:id" element={<Medic />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<Booking />} />
          <Route path="/cardiology" element={<Cardiology />} />
          <Route path="/neurology" element={<Neurology />} />
          <Route path="/gynecology" element={<Gynecology />} />
          </Route>

          {/* <Route path="*" element={<Navigate to="/Login" replace />} /> */}
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>

  );
}