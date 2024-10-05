import "./Home.css"
import JumboTron from "./JumboTron"
import SignupPopup from "./SignUp"
import SignIn from "./SignIn"
import Navbar from "./Navbar"
import {useState} from "react"
const Home = () =>{
const [signUpPopup, setSignUp] = useState(false)
const [signInPopup, setSignIn] = useState(false)
const toggleSignInPopup = () => {
    setSignIn(!signInPopup)
}
const toggleSignUpPopup = () => {
    setSignUp(!signUpPopup)
}
return(
    <div>
        <Navbar toggleSignUpPopup={toggleSignUpPopup} toggleSignInPopup={toggleSignInPopup}/>
        <JumboTron toggleSignIn={toggleSignInPopup}/>
        {signUpPopup && <SignupPopup toggleSignUpPopup={toggleSignUpPopup}/>}
        {signInPopup && <SignIn toggleSignInPopup={toggleSignInPopup}/>}
    </div>
)
}
export default Home