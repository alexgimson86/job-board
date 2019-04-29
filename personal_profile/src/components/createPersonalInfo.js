import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import Resume from './resumeUpload';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            state: 'TX',
            address: '',
            zip: '',
            city: '',
            personalWebsite: '',
            country: 'US',
            title: '',
            recruiter: '',
            student: '',
            //resume:


        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (event) => {
        axios.post('http://localhost:4000/student/signup',
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
                description: this.state.description,
                title: this.state.title
            })
            .then(response => {
            })
            .catch(err => {
                console.log(err)
            });
    }
    stateDropdown = () => {
        let state =
            (<select onChange={this.handleChange}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option selected value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>)
        return state;
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>
                        Resume Information
                    </h2>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nameInput">Descriptive Introduction</label>
                        <textarea id="desc" onChange={this.handleChange} name="title" value={this.state.title} className="form-control">
                        </textarea>
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="nameInput">First Name</label>
                        <input required type="text" onChange={this.handleChange} value={this.state.firstName} className="form-control" id="fName" name="firstName" placeholder="Enter First Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input required type="text" onChange={this.handleChange} value={this.state.lastName} className="form-control" name="lastName" id="lName" placeholder="Enter Last Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input required type="email" onChange={this.handleChange} value={this.state.email} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input required type="text" onChange={this.handleChange} value={this.state.phone} className="form-control" name="phone" id="phone" aria-describedby="phone number" placeholder="Enter Phone Number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address">Street Address</label>
                        <input required type="text" onChange={this.handleChange} value={this.state.address} className="form-control" name="address" id="address" placeholder="Enter Street Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address">City</label>
                        <input required type="text" onChange={this.handleChange} value={this.state.city} className="form-control" name="city" id="city" placeholder="Enter Street Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Enter Zip Code ">Zip Code</label>
                        <input type="text" onChange={this.handleChange} value={this.state.zip} className="form-control" name="zip" id="zip" placeholder="Enter Zip Code" />
                    </div>
                    <div className="form-group">
                        {this.stateDropdown()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Personal Website">Personal Website</label>
                        <input required type="text" onChange={this.handleChange} value={this.state.personalWebsite} className="form-control" name="personalWebsite" id="personalWebsite" placeholder="github or personal website URL" />
                    </div>

                    <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                </form>
                <br />
                <br />
                <Resume studentId={this.state.studentId} />
            </div>
        );
    }
}

export default PersonalInfo;
