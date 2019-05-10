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
        }
    }
    handleChange = (event) => {
        var splitId = event.target.id.split("#");
        let i = splitId[1]
        let values = [...this.state.jobs];
        if(event.target.name === 'title')
            values[i].title = event.target.value;
        else if(event.target.name === 'description')
            values[i].description = event.target.value
        else
            values[i].skills = event.target.value
        this.setState({ values });
        
    }
   appendJobForm = () => {
    var arr = [...this.state.jobs]
    var job = {
        title: '',
        skills:'',
        description: '',
    }
    arr.push(job)
    this.setState({
        jobs: [...this.state.jobs, job]
    })
   }
    addJob = () => {
        
        var titleId = 'title#';
        var descriptionId = 'description#'
        var skillsId ='skills#'
        return this.state.jobs.map((job , i )=>
        <li key={`job#${i}`} >
          <div><input type="text" id={`${titleId}${i}`} onChange={this.handleChange} value={job.title || ''} className="form-control"   name="title"  placeholder="Enter Job Title" />
            <input type="textarea"   id={`${descriptionId}${i}`} name="description" onChange = {this.handleChange} value = {job.description} className="form-control"  aria-describedby="job description" placeholder="Enter Job description" />
            <input type="textarea" id={`${skillsId}${i}`} name="skills" onChange ={this.handleChange} value={job.skills} className="form-control"  aria-describedby="required skills" placeholder="Enter required skills" />
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
                 <form onSubmit={this.handleSubmit}>

                    <Button style={bStyle} onClick={this.appendJobForm}>Add Job</Button>
                        <ol>

                        {this.addJob()}
                        </ol>
                    <input type="submit" value="Submit" />
                 </form>
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
