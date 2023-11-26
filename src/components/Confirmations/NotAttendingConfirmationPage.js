import "../../styles/AttendancePagesStyle.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';


const NotAttendingConfirmationPage = () => {
  return (
    <div>
      <div className="attending-confirmation-page-container">
        <div className="attending-confirmation-container">
          <p className="confirmation-name">Eric & Lauren</p>
          <div className="heart-container">
            </div>
          <p className="declined-confirmation">Thank you so much for letting us know 😊
          <FontAwesomeIcon id='heart' icon={faHeart} bounce size="xl" style={{ color: "#D4B78A" }} />
            <br/> You will be missed! 
            <br/> Please take care, we hope to see you soon</p>
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

export default NotAttendingConfirmationPage