import "./Home.css"
import JumboTron from "./JumboTron"
import SignupPopup from "./SignUp"
const Home = ({signUpPopup,setSignIn}) =>{

const toggleSignInPopup = () => {
    setSignIn(!signUpPopup)
}

return(
    <div>
        <JumboTron toggleSignIn={toggleSignInPopup}/>
        {signUpPopup && <SignupPopup signUpPopup={signUpPopup}/>}
    </div>
)
}
export default Home