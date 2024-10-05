// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const [signUpPopup, setSignUpPopup] = useState(false);
  const toggleSignUpPopup = () => {
    setSignUpPopup(!signUpPopup)
  }
  return (
    <Router>
      <Navbar signUpPopup={signUpPopup} toggleSignUpPopup={toggleSignUpPopup}/>
      <Routes>
        <Route path="/" element={<Home signUpPopup={signUpPopup} setSignIn={setSignUpPopup}/>} />
      </Routes>
    </Router>
  );
}

export default App;
