import React, { useState } from 'react';
import './RequestHelp.css';
import Navbar from './Navbar';
import SignupPopup from './SignUp';
import SignIn from './SignIn';
const RequestHelp = () => {
    const [title, setTitle] = useState('');
    const [typeOfRequest, setTypeOfRequest] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [financialAssistance, setFinancialAssistance] = useState(false);
    const [signUpPopup, setSignUp] = useState(false);
    const [signInPopup, setSignIn] = useState(false);
    const toggleSignInPopup = () => {
        setSignIn(!signInPopup);
    };

    const toggleSignUpPopup = () => {
        setSignUp(!signUpPopup);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            title,
            typeOfRequest,
            description,
            address,
            financialAssistance,
        });
    };

    return (
        <React.Fragment>
            <Navbar currSelected={"RequestHelp"} toggleSignInPopup={toggleSignInPopup} toggleSignUpPopup={toggleSignUpPopup}/>
            // ADD POP UP FUNCTIONALITY
        <div className="request-help-container">
            <h2 className="header">Submit a Request for Assistance</h2>
            <form onSubmit={handleSubmit} className="request-form">
                <div className="form-group">
                    <label>Request Title</label>
                    <input
                        type="text"
                        placeholder="What do you need help with?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Type of Request</label>
                    <input
                        type="text"
                        placeholder="Select the type of assistance you need"
                        value={typeOfRequest}
                        onChange={(e) => setTypeOfRequest(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Describe your Request</label>
                    <textarea
                        placeholder="Please describe your request"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Your Address</label>
                    <input
                        type="text"
                        placeholder="Enter your location or enable location services"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Would you like financial assistance?</label>
                    <div className="toggle">
                        <input
                            type="checkbox"
                            checked={financialAssistance}
                            onChange={() => setFinancialAssistance(!financialAssistance)}
                        />
                        <label>{financialAssistance ? "Yes" : "No"}</label>
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
        {signUpPopup && (
                <SignupPopup
                    toggleSignInPopup={toggleSignInPopup} // Pass toggleSignInPopup here
                    toggleSignUpPopup={toggleSignUpPopup}
                />
            )}
            {signInPopup && (
                <SignIn
                    toggleSignInPopup={toggleSignInPopup}
                    toggleSignUpPopup={toggleSignUpPopup}
                />
            )}
        </React.Fragment>
    );
};

export default RequestHelp;