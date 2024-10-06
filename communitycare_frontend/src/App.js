// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RequestHelp from './components/RequestHelp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/request-help" element={<RequestHelp />} />
      </Routes>
    </Router>
  );
}

export default App;
