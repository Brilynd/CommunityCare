// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RequestHelp from "./components/RequestHelp";
import ViewRequests from "./components/ViewRequests";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-help" element={<RequestHelp />} />
        <Route path="/view-requests" element={<ViewRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
