import React, { useState } from "react";
import "./SignUp.css";
import { HeartHandshake } from "lucide-react";
import { signUpUser } from "../Api";
import { useCookies } from 'react-cookie'; // Import useCookies

const SignupPopup = ({ toggleSignInPopup, toggleSignUpPopup }) => {
  const [cookies, setCookie] = useCookies(["user"]); // Define cookie names
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordError) {
      // Proceed with form submission (e.g., send data to the server)
      const response = await signUpUser(firstName, lastName, email, password, phoneNumber);
      console.log(response.data);
      setCookie("user", response.data, { path: "/" });
      
      // Optionally, close the signup popup or navigate elsewhere
      toggleSignUpPopup(); // Close the signup popup after successful signup
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
            <h1 className="primaryLogoTxt">Community<span className="secondaryLogoTxt">Care</span></h1>
            <HeartHandshake color="white" size="40" />
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" required onChange={(e) => { setFirstName(e.target.value) }} />
            <input type="text" placeholder="Last Name" required onChange={(e) => { setLastName(e.target.value) }} />
            <input type="email" placeholder="Email Address" required onChange={(e) => { setEmail(e.target.value) }} />
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
            <input type="tel" placeholder="Phone Number" required onChange={(e) => { setPhoneNumber(e.target.value) }} />
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
