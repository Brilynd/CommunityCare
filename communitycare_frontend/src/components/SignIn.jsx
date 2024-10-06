import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./SignIn.css";
import {HeartHandshake} from "lucide-react";
import { loginUser } from "../Api";
const SignIn = ({signInPopup,toggleSignInPopup}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");



  const validatePassword = (password) => {
    const minLength = 1;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!passwordError) {
     const response = await loginUser(username, password);
     console.log(response);
    } else {
      console.log("Fix the password error before submitting.");
    }
  };

  return (
    <>
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-btn" onClick={toggleSignInPopup}>
              &times;
            </button>
            <div className="header">
            <h1 className='primaryLogoTxt'>Community<p className='secondaryLogoTxt'>Care</p></h1>
            <HeartHandshake color='white' size="40" />
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Email Address" required onChange={handleUsernameChange}/>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </form>

            <div className='signup'>
              <span> Don't have an account? </span>
              {/* Use Link to navigate to SignUp */}
              <Link to="/signup" className="signup-here">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
    </>
  );
};

export default SignIn;
