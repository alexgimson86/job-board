import React, { Component } from 'react';
import JobSeekers from './components/jobSeekers'
import Login from './components/login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import PersonalInfo from './components/personalInfo'
import Signup from './components/signup'
import DisplayResumeBig from './components/displayResumeBig';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/jobseekers/:username" component={JobSeekers} />
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signup/:username" component={PersonalInfo}/>
          <Route exact path="/displayResumeBig/:filename" component={DisplayResumeBig} />
          <Route exact path="/profilePage/:username" component={Profile} />
        </Router>
      </div>
    );
  }
}
export default App;