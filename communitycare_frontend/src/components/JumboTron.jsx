import PrimaryBtn from "./PrimaryBtn"
import "./JumboTron.css"
import img1 from "../Homepage_img_1.png"
const JumboTron = ({toggleSignIn,isSignedIn}) => {
    return(
        <div className="jumboTronContainer">
            <div className="jumbotronLHS">
            <h1>Connecting Communities with Relief</h1>
            <p>CommunityCare connect communities impacted by natural disasters with vital relief resources, volunteers, and first responders, facilitating swift rescue efforts and supporting long-term rebuilding.</p>
            {!isSignedIn && <PrimaryBtn text="Get Started" onClick={() => toggleSignIn()} />}
            </div>
            <div className="jumbotronRHS">
            <img src={img1} alt="Community Care Logo" />
            <div className="overlay"/>
            </div>
        </div>
    )
}
export default JumboTron