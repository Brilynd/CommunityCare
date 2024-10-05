import React, { useState } from "react";
import "./SignUp.css";

const SignupPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const closePopup = () => {
    setShowPopup(false);
  };

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
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <h2>Sign Up</h2>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupPopup;
