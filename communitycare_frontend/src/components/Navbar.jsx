// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, CircleX, Menu } from 'lucide-react';

import './Navbar.css'; // Import the CSS file

const Navbar = ({ toggleSignUpPopup, toggleSignInPopup,currSelected }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <h1 className="primaryLogoTxt">Community<span className="secondaryLogoTxt">Care</span></h1>
        <HeartHandshake size="30" />
      </div>

      <nav className="navbar">
        <button onClick={toggleMobileMenu} className="hamburger">
          {isMobileMenuOpen ? <CircleX size="30" /> : <Menu size="30" />}
        </button>
        <div className={`links ${isMobileMenuOpen ? 'show' : ''}`}>
          <Link to="/" className={currSelected=="Home"?"link nav-link active":"link nav-link"} onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/request-help" className="link nav-link" onClick={toggleMobileMenu}>
            Request Help
          </Link>
          <Link to="/view-requests" className="link nav-link" onClick={toggleMobileMenu}>
            View Requests
          </Link>
          <Link to="/profile" className="link nav-link" onClick={toggleMobileMenu}>
            Profile
          </Link>
          {isLoggedIn ? (
            <p className="link nav-link" onClick={toggleSignUpPopup}>
              Sign Out
            </p>
          ) : (
            <p className="link nav-link" onClick={() => toggleSignInPopup()}>
              Sign In
            </p>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
