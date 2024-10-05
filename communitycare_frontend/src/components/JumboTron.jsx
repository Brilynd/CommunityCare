import PrimaryBtn from "./PrimaryBtn"
const JumboTron = () => {
    return(
        <div>
            <h1>Connecting Communities with Relief</h1>
            <p>CommunityCare connect communities impacted by natural disasters with vital relief resources, volunteers, and first responders, facilitating swift rescue efforts and supporting long-term rebuilding.</p>
            <PrimaryBtn text="Get Started" onClick={() => console.log("Get Started button clicked")} />
        </div>
    )
}
export default JumboTron