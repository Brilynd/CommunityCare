// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RequestHelp from "./components/RequestHelp";
import ViewRequests from "./components/ViewRequests";

function PrivateRoute({ children }) {
  const [cookies] = useCookies(['user']);
  
  // Check if 'user' cookie exists
  if (!cookies.user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/request-help" 
          element={
            <PrivateRoute>
              <RequestHelp />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/view-requests" 
          element={
            <PrivateRoute>
              <ViewRequests />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
