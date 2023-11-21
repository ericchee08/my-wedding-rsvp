import "../styles/HomePageStyle.css"
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="header-container">
          <p id='title' >Eric & Lauren</p>
          <p id='date'>on Monday 10th June 2024</p>
          <p id='venue'>at Calke Abbey, Derby</p>
          <Link to="/rsvp" id="rsvp"> RSVP</Link>
      </div>
      {/* <div className="container">
          <div className="schedule-container">
            <h2>Schedule</h2>
            <p>Coming Soon...</p>
          </div>
      </div> */}
    </div>
  )
}

export default HomePage