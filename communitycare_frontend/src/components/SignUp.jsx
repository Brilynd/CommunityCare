import React, { useState } from "react";
import "./SignUp.css";
import {HeartHandshake} from "lucide-react";

const SignupPopup = ({toggleSignInPopup, toggleSignUpPopup}) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const validatePassword = (password) => {
    const capitalLetter = /[A-Z]/;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
    const number = /\d/;
    const minLength = 8;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!capitalLetter.test(password)) {
      return "Password must contain at least one capital letter.";
    }
    if (!specialCharacter.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (!number.test(password)) {
      return "Password must contain at least one number.";
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
      console.log("Form submitted!");
    } else {
      console.log("Fix the password error before submitting.");
    }
  };

  return (
    <>
        <div className="popup-overlay">
          <div className="popup-container-signup">
            <button className="close-btn" onClick={toggleSignUpPopup}>
              &times;
            </button>
            <div className="header">
              <h1 className="primaryLogoTxt">Community<p className="secondaryLogoTxt">Care</p></h1>
              <HeartHandshake color="white" size="40" />
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
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
              <input type="tel" placeholder="Phone Number" required />
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
              <div className='signin'>
                <span>Already have an account? </span>
                <span
                    className="signin-here"
                    onClick={() => {
                      toggleSignInPopup();
                      toggleSignUpPopup();
                    }}
                >
              Sign In
            </span>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default SignupPopup;
