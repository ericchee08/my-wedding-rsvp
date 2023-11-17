import "../styles/HomePageStyle.css"
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <div className="header-container">
          <p id='title' >Eric & Lauren</p>
          <p id='date'>Monday, June 10, 2024</p>
          <Link to="/rsvp" id="rsvp"> RSVP</Link>
      </div>
      <div className="container">
          <div className="schedule-container">
            <h2>Schedule</h2>
            <p>Coming Soon...</p>
          </div>
      </div>
    </>
  )
}

export default HomePage