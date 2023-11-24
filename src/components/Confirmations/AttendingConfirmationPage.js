import "./AttendingConfirmationPage.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const AttendingConfirmationPage = () => {
  return (
    <div>
      <div className="attending-confirmation-page-container">
        <div className="attending-confirmation-container">
          <p className="rsvp-name">Eric & Lauren</p>
          <p id="rsvp-venue"> The Riding School, Calke Abbey</p>
          <p id="rsvp-date">Monday June 10 2024</p>
          <FontAwesomeIcon id='paper-plane'icon={faPaperPlane} bounce size="2xl" style={{ color: "#c067d5" }} />
          <p id="success-confirmation">You have succesfully sent your RSVP!</p>

        </div>

        <div id="back">
              <Link to="/" id="back-button">
                  Home
              </Link>
          </div>
      </div>
    </div>

    
  )
}

export default AttendingConfirmationPage