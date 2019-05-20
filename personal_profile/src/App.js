import React, { Component } from 'react';
import JobSeekers from './components/jobSeekers'
import Login from './components/login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import PersonalInfo from './components/personalInfo'
import Signup from './components/signup'
import DisplayResumeBig from './components/displayResumeBig';
import Profile from './components/profile';
import Chat from './components/chatInput';
import RecruiterSignup from './components/recruiterSignup';
import AddJobs from './components/addJobs';
import CreatePersonalInfo from  './components/createPersonalInfo';
import RecruiterList from './components/recruiters';
import RecruiterProfile from './components/recruiterProfile';
import JobList from './components/jobList';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/jobseekers/:username" component={JobSeekers} />
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/edit/:username" component={PersonalInfo}/>
          <Route exact path="/signup/:username" component={CreatePersonalInfo}/>
          <Route exact path="/displayResumeBig/:filename" component={DisplayResumeBig} />
          <Route exact path="/profilePage/:username" component={Profile} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/recruiterSignup/:username" component={RecruiterSignup} />
          <Route exact path="/recruiters/:username" component={RecruiterList}/>
          <Route exact path="/addJobs/:username" component={AddJobs} />
          <Route exact path="/recruiterProfilePage/:username" component={RecruiterProfile}/>
          <Route exact path="/jobList/:username" component={JobList}/>
        </Router>
      </div>
    );
  }
}
export default App;