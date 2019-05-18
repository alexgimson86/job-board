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
           jobs: [],
           loginPage: null,
        }
    }
    handleChange = (event) => {
        var splitId = event.target.id.split("#");
        let i = splitId[1]
        let values = [...this.state.jobs];
        if(event.target.name === 'title')
            values[i].title = event.target.value;
        else if(event.target.name === 'description')
            values[i].jobDescription = event.target.value
        else if(event.target.name === 'skills')
            values[i].skills = event.target.value
         else if(event.target.name === 'city')
            values[i].location = event.target.value
        else if(event.target.name === 'salary')
            values[i].salary = event.target.value
        else if(event.target.name === 'website')
            values[i].url = event.target.value
        this.setState({ values });
        
    }
    deleteJob = (event) =>
    {
        var jobIndex = event.target.name

        var newJobList = this.state.jobs
        newJobList.splice(jobIndex,1)
        this.setState({
            jobs: newJobList
        })

    }
   appendJobForm = () => {
    var arr = [...this.state.jobs]
    var job = {
        title: '',
        skills:'',
        jobDescription: '',
        salary: '',
        location: '', 
        url: '' ,
    }
    arr.push(job)
    this.setState({
        jobs: [...this.state.jobs, job]
    })
   }
    addJob = () => {
        var titleId = 'title#'
        var descriptionId = 'description#'
        var skillsId ='skills#'
        var salaryId = 'salary#'
        var cityId = 'city#'
        var websiteId = 'website#'

        return this.state.jobs.map((job , i )=>
        <li  key={`job#${i}`} >
          <div><input type="text" id={`${titleId}${i}`} onChange={this.handleChange} value={job.title || ''} className="form-control"   name="title"  placeholder="Enter Job Title" />
            <input type="text"   id={`${descriptionId}${i}`} name="description" onChange = {this.handleChange} value = {job.description} className="form-control"  aria-describedby="job description" placeholder="Enter Job description" />
            <input type="text" id={`${skillsId}${i}`} name="skills" onChange ={this.handleChange} value={job.skills} className="form-control"  aria-describedby="required skills" placeholder="Enter required skills" />
            <input type="text" id={`${cityId}${i}`} name="city" onChange ={this.handleChange}className="form-control"  aria-describedby="city" placeholder="Enter city" />
            <input type="text" id={`${salaryId}${i}`} name="salary" onChange ={this.handleChange}className="form-control"  aria-describedby="salary" placeholder="Enter Salary" />
            <input type="text" id={`${websiteId}${i}`} name="website" onChange ={this.handleChange}className="form-control"  aria-describedby="website" placeholder="Enter Company Website" />
            <Button variant="warning" type="button" name={i} onClick={this.deleteJob}>delete</Button>
            <hr/>
            

        <br/></div>
        </li>
        )
      
    }
    handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:4000/recruiter/addJobs/' + this.props.match.params.username,
            {
                jobs: [...this.state.jobs]
            })
            .then(response => {
               
            })
            .catch(err => {
                console.log(err)
            });
    }
    returnToLoginOrList = () => {
        axios.get('http://localhost:4000/checkForLogin',{withCredentials:true})
        .then(response => {
            if(!response.data){
                this.setState({
                    loginPage: '/'
                })
            }
            else{
                let un = sessionStorage.getItem("myCurrentUsername")
                this.setState({
                    loginPage: `/jobSeekers/${un}`
                })
            }
           
        })
        .catch(err => {
            console.log(err)
        });
        

    }

    render() {
        let bStyle = {
            'float': 'left'
        }

        if (this.state.loginPage) {
            return <Redirect to={this.state.loginPage} />
        }

        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>
                        add jobs page
                    </h3>
                </div>


                <div className="jobsDiv">
                 <form onSubmit={this.handleSubmit}>

                    <Button style={bStyle} onClick={this.appendJobForm}>Add Job</Button>
                    <div>
                        <ol>
                        {this.addJob()}
                        </ol>
                    </div>

                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                 </form>
                </div>
                <br/>
                <br/>
                <hr/>
                <Button variant="success" onClick={this.returnToLoginOrList}>Done</Button>
            </div>
        );
    }
}

export default RecruiterSignup;
