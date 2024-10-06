import React, { useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import './RequestHelp.css';
import Navbar from './Navbar';
import SignupPopup from './SignUp';
import SignIn from './SignIn';
import { addRequestHelp } from '../Api';
import { useCookies } from 'react-cookie';

const RequestHelp = () => {
    const [title, setTitle] = useState('');
    const [typeOfRequest, setTypeOfRequest] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [financialAssistance, setFinancialAssistance] = useState(false);
    const [signUpPopup, setSignUp] = useState(false);
    const [signInPopup, setSignIn] = useState(false);
    const [autocomplete, setAutocomplete] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [cookies] = useCookies(['user']);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const toggleSignInPopup = () => {
        setSignIn(!signInPopup);
    };

    const toggleSignUpPopup = () => {
        setSignUp(!signUpPopup);
    };

    const getUserIdFromCookie = () => {
        const userCookie = cookies.user;
        return userCookie;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading animation
        setError(false); // Reset error state

        const userId = getUserIdFromCookie();

        try {
            await addRequestHelp(
                userId,
                title,
                typeOfRequest,
                description,
                financialAssistance,
                latitude,
                longitude
            );
            // If successful, you can reset form or show a success message
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError(true); // Set error state if there's an issue
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <Navbar currSelected={"RequestHelp"} toggleSignInPopup={toggleSignInPopup} toggleSignUpPopup={toggleSignUpPopup} />
            <div className="request-help-container">
                <h2 className="header">Submit a Request for Assistance</h2>
                <form
                    onSubmit={handleSubmit}
                    className={`request-form ${loading ? 'success-animation' : ''} ${error ? 'error-animation' : ''}`}
                >
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
                        <select
                            value={typeOfRequest}
                            onChange={(e) => setTypeOfRequest(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select the type of assistance you need</option>
                            <option value="Food and Water">Food and Water</option>
                            <option value="Shelter">Shelter</option>
                            <option value="Financial Assistance">Financial Assistance</option>
                            <option value="Emotional Support">Emotional Support</option>
                            <option value="Home Repairs">Home Repairs</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Job Assistance">Job Assistance</option>
                            <option value="Other">Other</option>
                        </select>
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
                        <LoadScript googleMapsApiKey="AIzaSyDzpbD_LBjyzk7_jQ00DjSF4_r9J5M8MAk" libraries={["places"]}>
                            <Autocomplete
                                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                                onPlaceChanged={() => {
                                    if (autocomplete) {
                                        const place = autocomplete.getPlace();
                                        if (place && place.formatted_address) {
                                            setAddress(place.formatted_address);
                                            if (place.geometry && place.geometry.location) {
                                                const lat = place.geometry.location.lat();
                                                const lng = place.geometry.location.lng();
                                                setLatitude(lat);
                                                setLongitude(lng);
                                            }
                                        }
                                    }
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter your location"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Autocomplete>
                        </LoadScript>
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
                    toggleSignInPopup={toggleSignInPopup}
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
