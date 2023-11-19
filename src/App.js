import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RsvpSection from './components/RsvpSection';
import AttendingConfirmationPage from './components/Confirmations/AttendingConfirmationPage';
import NotAttendingConfirmationPage from './components/Confirmations/NotAttendingConfirmationPage';

function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" Component={HomePage}/>
          <Route path="/rsvp" Component={RsvpSection}/>
          <Route path="/attending-confirmation" Component={AttendingConfirmationPage} />
          <Route path="/not-attending-confirmation" Component={NotAttendingConfirmationPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
