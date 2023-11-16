import "../styles/RsvpSectionStyle.css"
import { Link } from "react-router-dom";

const RsvpSection = () => {
  return (
    <div className="rsvp-section-container">
        <div className="rsvp-container">
            <div className="rsvp-headers">
                <p>Eric & Lauren</p>
                <p>Calke Abbey</p>
                <p>Monday, June 10, 2024</p>
            </div>

            <form action="">
                <div className="rsvp-input-container">
                    <div className="input-name">
                        <label htmlFor="">First Name</label>
                        <input type="text" />
                    </div>
                    <div className="input-name">
                        <label htmlFor="">Last Name</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="rsvp-buttons">
                    <div className="attendance-button">I can attend</div>
                    <div className="attendance-button">Sorry I can't attend</div>
                </div>
            </form>
        </div>
        <div id="back">
            <Link to="/" id="back-button"> Back</Link>
        </div>
    </div>
  )
}

export default RsvpSection