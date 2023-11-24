import "./AttendingConfirmationPage.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const AttendingConfirmationPage = () => {
  return (
    <div>
      <div className="attending-confirmation-page-container">
        <div className="attending-confirmation-container">
          <p className="confirmation-name">Eric & Lauren</p>
          <p className="confirmation-venue"> The Riding School, Calke Abbey <br /> Monday 10th June 2024</p>
          <img id="proposal" src="https://iili.io/Jnu18wG.jpg" alt="" />
          <FontAwesomeIcon id='paper-plane'icon={faPaperPlane} bounce size="2xl" style={{ color: "#D4B78A" }} />
          <p className="success-confirmation">You have succesfully sent your RSVP! <br/> We can't wait to see you!</p>

        </div>

        <div id="home">
              <Link to="/" id="home-button">
                  Home
              </Link>
          </div>
      </div>
    </div>

    
  )
}

export default AttendingConfirmationPage