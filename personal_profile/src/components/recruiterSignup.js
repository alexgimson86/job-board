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
            firstName: '',
            title: '',
            lastName: '',
            phone: '',
            email: '',
            state: 'TX',
            companyWebsite: '',
            country: 'US',
            addJobsPage: null,
            recruiterId: null,
            jobTitle:null,
            jobTitles: [],
            jobDescriptions: [],
            skills: [],



        }
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:4000/recruiter/' + this.props.match.params.username,
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                email: this.state.email,
                country: this.state.country,
                url: this.state.personalWebsite,
            })
            .then(response => {
            })
            .catch(err => {
                console.log(err)
            });
    }
    addJobs = () => {
        this.setState({
            addJobsPage: `/addJobs/${this.props.match.params.username}`
        })

    }
    render() {
        if (this.state.addJobs) {
            return <Redirect to={this.state.addJobs} />
        }

        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>
                        Recruiter Signup
                    </h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">

                        <hr />
                        <label htmlFor="nameInput">Descriptive Title</label>
                        <textarea id="desc" onChange={this.handleChange} name="title" value={this.state.title} className="form-control">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nameInput">First Name</label>
                        <input type="text" onChange={this.handleChange} value={this.state.firstName} className="form-control" id="fName" name="firstName" placeholder="Enter First Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" onChange={this.handleChange} value={this.state.lastName} className="form-control" name="lastName" id="lName" placeholder="Enter Last Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" onChange={this.handleChange} value={this.state.email} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" onChange={this.handleChange} value={this.state.phone} className="form-control" name="phone" id="phone" aria-describedby="phone number" placeholder="Enter Phone Number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Company">Company Name</label>
                        <input type="text" onChange={this.handleChange} value={this.state.company} className="form-control" name="company" id="company" placeholder="Enter Company name" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Company Website">Company Website</label>
                        <input type="text" onChange={this.handleChange} value={this.state.companyWebsite} className="form-control" name="companyWebsite" id="companyWebsite" placeholder="company website URL" />
                    </div>
                    
                    <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                </form>
                <br />
                <hr />
                <button onClick={this.addJobs}>Done</button>
            </div>
        );
    }
}

export default RecruiterSignup;
