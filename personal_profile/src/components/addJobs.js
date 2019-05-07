import React, { Component } from 'react';
import '../styles/personalForm.css'
import axios from 'axios';
import { Button } from 'react-bootstrap'
import Resume from './resumeUpload';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";

class RecruiterSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: null,
            jobDescription: null,
            skill: null,
            jobTitles: [],
            jobDescriptions: [],
            skills: [],



        }
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        var appendedArr = [];
        switch(name){
            case 'jobTitles':
                appendedArr = this.state.jobTitles.concat(value)
            break;
            case 'jobDescriptions': 
                appendedArr = this.state.jobDescriptions.concat(value);
            break;
            case 'skills' : 
                appendedArr = this.state.skills.concat(value);
            break;
            default: 
                appendedArr = null;
        }
        this.setState({
            [name]: appendedArr
        });
    }
    addJob = () => {

        let job = <div><form><input type="text" onChange={this.handleChange} value={this.state.jobTitle} className="form-control" name="jobTitles" id="jobTitles" aria-describedby="job title" placeholder="Enter Job Title" />
            <input type="textarea" onChange={this.handleChange} value={this.state.jobDescription} className="form-control" name="jobDescriptions" id="jobDescriptions" aria-describedby="job title" placeholder="Enter Job description" />
            <input type="textarea" onChange={this.handleChange} value={this.state.skill} className="form-control" name="skill" id="skills" aria-describedby="required skills" placeholder="Enter required skills" />
        </form><br/></div>

        if (this.state.jobs) {
            var joinedJobs = this.state.jobs.concat(job)
            this.setState({
                jobs: joinedJobs
            })
        }
        else {
            this.setState({
                jobs: [job]
            })
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:4000/student/' + this.props.match.params.username,
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                email: this.state.email,
                state: this.state.state,
                street: this.state.address,
                zip: this.state.zip,
                country: this.state.country,
                personalWebsite: this.state.personalWebsite,
                title: this.state.title,
            })
            .then(response => {
            })
            .catch(err => {
                console.log(err)
            });
    }
    returnToList = () => {
        this.setState({
            listPage: `/jobseekers/${this.props.match.params.username}`
        })

    }

    render() {
        let bStyle = {
            'float': 'left'
        }
        if (this.state.listPage) {
            return <Redirect to={this.state.listPage} />
        }

        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>
                        add jobs page
                    </h3>
                </div>


                <div className="jobsDiv">

                    <Button style={bStyle} onClick={this.addJob}>Add Job</Button>
                    <ol id="jobList">
                        {this.state.jobs ? this.state.jobs.map(function (job, i ) {
                            return <li key={i}>{job}</li>
                        }) : ''}
                    </ol>
                </div>


                <br />
                <br />
                <Resume username={this.props.match.params.username} />
                <br />
                <hr />
                <button onClick={this.returnToList}>Done</button>
            </div>
        );
    }
}

export default RecruiterSignup;
