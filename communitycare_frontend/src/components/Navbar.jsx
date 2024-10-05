// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from 'react-icons/ion';
import {HeartHandshake} from 'lucide-react'
import { home, informationCircle, mail, menu, close } from 'ionicons/icons';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div style={{display:"flex"}}>
        <div className='logo-container'>
          <h1>Community<p>Care</p></h1>
          <HeartHandshake size="50" />
        </div>

    <nav className="navbar">
      <button onClick={toggleMobileMenu} className="hamburger">
        <IonIcon icon={isMobileMenuOpen ? close : menu} className="icon" />
      </button>
      <div className={`links ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link to="/" className="link nav-link" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link to="/about" className="link nav-link" onClick={toggleMobileMenu}>
          About
        </Link>
        <Link to="/contact" className="link nav-link" onClick={toggleMobileMenu}>
          Contact
        </Link>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
