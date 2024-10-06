import React, { useState } from "react";
import "./SignIn.css";
import {HeartHandshake} from "lucide-react";

const SignIn = ({signInPopup,toggleSignInPopup}) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");



  const validatePassword = (password) => {
    const minLength = 8;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      // Proceed with form submission (e.g., send data to the server)
      console.log("Sign In successful!");
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
              <input type="email" placeholder="Email Address" required />
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
          </div>
        </div>
    </>
  );
};

export default SignIn;
