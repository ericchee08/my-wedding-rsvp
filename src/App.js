import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RsvpSection from './components/RsvpSection';

function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" Component={HomePage}/>
          <Route path="/rsvp" Component={RsvpSection}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
