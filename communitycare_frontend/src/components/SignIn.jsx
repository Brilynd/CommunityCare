import React, { useState } from "react";
import { useCookies } from "react-cookie"; // Import the useCookies hook
import "./SignIn.css";
import { HeartHandshake } from "lucide-react";
import { loginUser } from "../Api";

const SignIn = ({ toggleSignInPopup, toggleSignUpPopup }) => {
  const [cookies, setCookie] = useCookies(["user"]); // Define cookie names
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordError) {
      const response = await loginUser(username, password);
      if (response) {
        // Assuming response contains user data upon successful login
        setCookie("user", response.data, { path: "/" }); // Set cookie with username
        toggleSignInPopup();
        console.log(response);
      } else {
        console.log("Login failed.");
      }
    } else {
      console.log("Fix the password error before submitting.");
    }
  };

  return (
    <>
      <div className="signin-popup-overlay">
        <div className="signin-popup-container">
          <button className="signin-close-btn" onClick={toggleSignInPopup}>
            &times;
          </button>
          <div className="signin-header">
            <h1 className="signin-primaryLogoTxt">
              Community<p className="signin-secondaryLogoTxt">Care</p>
            </h1>
            <HeartHandshake color="white" size="40" />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email Address"
              required
              onChange={handleUsernameChange}
            />
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
            <button type="submit" className="signin-btn">Sign In</button>
          </form>

          <div className='signin-signup'>
            <span>Don't have an account? </span>
            <span
              className="signin-signup-here"
              onClick={() => {
                toggleSignInPopup();
                toggleSignUpPopup();
              }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
