// 
import React, { useState } from "react";
import "../src/assets/css/Login.css";
import axios from "axios";
import { VscEye } from "react-icons/vsc";
import { TbEyeClosed } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // ✅ import AuthProvider hook

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ State for Login
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  // ✅ State for Register
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth(); // ✅ use signIn from AuthProvider

  // ✅ Handle input change for Login
  const handleLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  // ✅ Handle input change for Register
  const handleRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler for Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", loginValues)
      .then((response) => {
        if (response.data.Status === "Success") {
          // ✅ Save user data in context + localStorage
          signIn({
            email: loginValues.email,
            token: response.data.token || "dummy-token",
          });

          

          // ✅ Redirect to original path or /home
          const redirectTo = location.state?.from?.pathname || "/home";
          navigate(redirectTo, { replace: true });
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Check console.");
      });
  };

  // ✅ Submit handler for Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", registerValues)
      .then((response) => {
        alert("Registration successful! You can now log in.");
        setIsRegister(false); // Switch back to login form
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("Registration failed. Check console.");
      });
  };

  return (
    <div className="wrapper">
      <div className={`auth-container ${isRegister ? "register-mode" : ""}`}>
        {/* Forms Section */}
        <div className="forms-container">
          {/* Login Form */}
          {!isRegister && (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              <h2>Login</h2>
              <div className="input-box">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={loginValues.email}
                  onChange={handleLoginChange}
                  required
                />
                <i className="fa fa-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginValues.password}
                  onChange={handleLoginChange}
                  required
                />
                <i className="fa fa-lock"></i>
              </div>
              <button type="submit" className="Button">
                Login
              </button>
            </form>
          )}

          {/* Register Form */}
          {isRegister && (
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <h2>Register</h2>
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={registerValues.name}
                  onChange={handleRegisterChange}
                  required
                />
                <i className="fa fa-user icon"></i>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerValues.email}
                  onChange={handleRegisterChange}
                  required
                />
                <i className="fa fa-envelope icon"></i>
              </div>
              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={registerValues.password}
                  onChange={handleRegisterChange}
                  required
                />
                {showPassword ? (
                  <VscEye id="eye_icon" onClick={() => setShowPassword(false)} />
                ) : (
                  <TbEyeClosed id="eye_icon" onClick={() => setShowPassword(true)} />
                )}
              </div>
              <button type="submit" className="Button">
                Register
              </button>
            </form>
          )}
        </div>

        {/* Overlay Section */}
        <div className="overlay-container">
          <div className="overlay-panel overlay-left">
            <h2>Hello, Welcome!</h2>
            <p>Don’t have an account? Register now and join us.</p>
            <button className="Button" onClick={() => setIsRegister(true)}>
              Register
            </button>
          </div>

          <div className="overlay-panel overlay-right">
            <h2>Welcome Back!</h2>
            <p>Already have an account? Login with your details.</p>
            <button className="Button" onClick={() => setIsRegister(false)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

