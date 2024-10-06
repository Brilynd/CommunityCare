import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RequestHelp from './components/RequestHelp';
import Navbar from './components/Navbar';
import SignUpPopup from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => {
    const [signUpPopup, setSignUp] = useState(false);
    const [signInPopup, setSignIn] = useState(false);

    // Toggle SignIn and SignUp functions
    const toggleSignInPopup = () => {
        setSignIn(!signInPopup);
    };

    const toggleSignUpPopup = () => {
        setSignUp(!signUpPopup);
    };

    return (
        <Router>
            <Navbar toggleSignUpPopup={toggleSignUpPopup} toggleSignInPopup={toggleSignInPopup} />

            {/* Define all your routes here */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/request-help" element={<RequestHelp />} />
                {/*<Route path="/view-requests" element={<ViewRequests />} />
                <Route path="/profile" element={<Profile />} /> */}
            </Routes>
            {signUpPopup && <SignUpPopup toggleSignUpPopup={toggleSignUpPopup} />}
            {signInPopup && <SignIn toggleSignInPopup={toggleSignInPopup} />}
        </Router>
    );
};

export default App;