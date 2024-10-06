import "./Home.css";
import JumboTron from "./JumboTron";
import SignupPopup from "./SignUp";
import SignIn from "./SignIn";
import Navbar from "./Navbar";
import SupportUs from "./SupportUs";
import { useState } from "react";
import InformationDisplay from "./InformationDisplay";

const Home = () => {
    const [signUpPopup, setSignUp] = useState(false);
    const [signInPopup, setSignIn] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const toggleSignInPopup = () => {
        setSignIn(!signInPopup);
    };

    const toggleSignUpPopup = () => {
        setSignUp(!signUpPopup);
    };

    return (
        <div>
            <Navbar toggleSignUpPopup={toggleSignUpPopup} toggleSignInPopup={toggleSignInPopup} currSelected={"Home"} />
            <JumboTron toggleSignIn={toggleSignInPopup} isSignedIn={isSignedIn} />
            <SupportUs />
            <InformationDisplay />
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
        </div>
    );
};

export default Home;