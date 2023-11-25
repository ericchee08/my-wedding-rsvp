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
            <div className="paper-plane-container">
          <FontAwesomeIcon id='paper-plane'icon={faPaperPlane} bounce size="2xl" style={{ color: "#D4B78A" }} />
            </div>
          <p className="success-confirmation">Thanks for your RSVP ❤️ <br/> We can't wait to see you!</p>
          <div id="home">
              <Link to="/" id="home-button">
                  Home
              </Link>
          </div>
        </div>

        
      </div>
    </div>

    
  )
}

export default AttendingConfirmationPage