import './Home.css';
import JumboTron from './JumboTron';
import SupportUs from './SupportUs';

const Home = ({ toggleSignInPopup, isSignedIn }) => {
    return (
        <div>
            {/* Pass the toggleSignInPopup and isSignedIn props to JumboTron */}
            <JumboTron toggleSignIn={toggleSignInPopup} isSignedIn={isSignedIn} />
            <SupportUs />
        </div>
    );
};

export default Home;