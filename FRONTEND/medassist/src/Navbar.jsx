// // Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import "./assets/css/Navbar.css";
// import bgimage from './assets/images/ChatGPT_Image_Jul_31__2025__03_56_15_PM-removebg-preview.png';
// const Navbar = () => {
//     return (
//         <div className='navbar'>
//             <div className="box1">
//                 <div className="sbox1">
//                     <img src={bgimage} alt="bg" />
//                     <div className="sbox2">MediAssist+</div>
//                 </div>
//             </div>
//             <div className="box2">
//                 <ul className="nav-list">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/about">About Us</Link></li>
//                     <li><Link to="/service">Services</Link></li>
//                     <li><Link to="/doctors">Doctors</Link></li>
//                     <li><Link to="/department">Departments</Link></li>
//                 </ul>
//             </div>
//             <a href="#" className="btn-nav">MediBot<span><i></i></span></a>
//         </div>
//     );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./assets/css/Navbar.css";
import bgimage from './assets/images/ChatGPT_Image_Jul_31__2025__03_56_15_PM-removebg-preview.png';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import Chatbot from './Chatbot';



const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {signOut} = useAuth();
   const nav =useNavigate();
   const handleLogout = () => {
    signOut();              // ✅ clear user + localStorage
    nav("/login");
   }
    return (
        <div className='navbar'>
            <div className="box1">
                <div className="sbox1">
                    <img src={bgimage} alt="bg" />
                    <div className="sbox2">MediAssist+</div>
                </div>
            </div>
            <div className="box2">
                <div
                    className={`hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span />
                    <span />
                    <span />
                </div>
                <ul className={`nav-list ${menuOpen ? "show" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/service">Services</Link></li>
                    <li><Link to="/doctors">Doctors</Link></li>
                    <li><Link to="/department">Departments</Link></li>
                    <li>
                        <button id="login-png" onClick={handleLogout} ><IoMdLogOut id='icon-logout' /></button>
                    </li>
                </ul>
                
            </div>
            
        </div>
    );
};
export default Navbar;