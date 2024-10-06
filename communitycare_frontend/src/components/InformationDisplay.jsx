import "./InformationDisplay.css";
import img3 from "../img_3.png"
import img2 from "../Img_2.png"
const InformationDisplay = () => {
    return (
        <div className="InformationDisplay-container">
            <div className="Individual-Display">
                <img src={img2} alt="" />
                <div>
                <h1>Addressung FEMA’s Funding Crisis</h1>
                <p>FEMA is projected to face a $2.8 billion decifit as early as February 2025, even with the Fiscal Year 2025 Continuing Resolution. This shortfall threatens their ability to effectively respond to future disasters, leaving many individuals and families vulnerable. Our organization steps in where federal support may alter, ensuring those affected recieve the essentia; help they need. Your contributions are crucial for providing immediate relief and building a strong, more prepared communitry. </p>
                </div>
            </div>
            
                <div  className="Individual-Display">
                <div>
                <h1>Join Us in Making a Difference</h1>
                <p>With FEMA facing under funding and the threat of bankruptcy, community support is crucial. Natural disasters can leave families in dire need, and our organization fills the gap left by inadequate federal assistance. By support us, you help provide vital resources and build a stronger, more resiliant community. Together, we can ensure that no one faces the aftermath of disaster alone. Your generosity makes a lasting impact!</p>
                </div>
                <img src={img3} alt="" />

            </div>
        </div>
    );
    }
    export default InformationDisplay;