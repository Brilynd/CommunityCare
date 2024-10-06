import{Share, HandCoins, Hammer} from "lucide-react"
import "./SupportUs.css"
const SupportUs = () => {
    return (
        <div className="SupportUs-container">
            <h1 className="supportUs-header">How to Support</h1>
        <div className="card-container">
            <div>
            <Share size="50"/>
            <h1>Share and Amplify Support</h1>
            <p>Help others by sharing the stories and needs of those impacted by disasters, spreading awareness and support.</p>
            </div>
            <div>
            <HandCoins size="50"/>
            <h1>Provide Financial Assistance</h1>
            <p>Make a difference by donating funds directly to individuals and families affected by disasters, helping them rebuild and recover.</p>
            </div>
            <div>
            <Hammer size="50"/>
            <h1>Offer Hands-On Assistance</h1>
            <p>Contribute by volunteering your time and skills, providing direct physical support to those in need of help with rebuilding, cleanup, and recovery efforts.</p>
            </div>
        </div>
    </div>
    );
}
export default SupportUs;