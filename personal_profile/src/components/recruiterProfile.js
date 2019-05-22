import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, ListGroup, Table, Image, Row, Col, Jumbotron, ListGroupItem } from 'react-bootstrap'
import { Document, Page, pdfjs } from "react-pdf";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class RecruiterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiter: null,
            numPages: null,
            pageNumber: 1,
            previousPage: null,
            editPage: null,
            jobs: null,
        }
    }
    editJob=(event) =>{
        alert(event.target.id)
    }
    componentDidMount() {
        let myId = this.props.match.params.username
        axios({
            method: 'get',
            url: 'http://localhost:4000/recruiter/' + myId,
            withCredentials: true,
        }).then(response => {
            this.setState({
                recruiter: response.data[0]
            })
            axios({
                method: 'get',
                url: 'http://localhost:4000/job/' + myId,
                withCredentials: true,
            }).then( response=> {
               let jobList =  response.data.map( job =>{
                   var buttonKey = `edit#${job._id}`
                return(
                    <tr key={job._id}>
                        <Button onClick={this.editJob} id={buttonKey}>edit</Button>
                        <td>{job.title}</td>
                        <td>{job.jobDescription}</td>
                        <td>{job.skills}</td>
                        <td>{job.salary}</td>
                        <td>{job.location}</td>
                        <td>{job.url}</td>
                    </tr>
                )})
                this.setState({jobs: jobList})
            })
        }).catch(err => {
            console.log(err);
        })
    }
    goToEditPage = () => {
        var editLink = `/recruiterSignup/${this.state.recruiter.username}`
        this.setState({
            editPage: editLink
        })
    }
    goBackToList = () => {
        var backLink = `/jobSeekers/${this.state.recruiter.username}`
        this.setState({
            previousPage: backLink
        })
    }

    render() {

        if (!this.state.recruiter) {
            return null;
        }
        else if (this.state.previousPage) {
            return <Redirect to={this.state.previousPage} />
        }
        else if (this.state.editPage) {
            return <Redirect to={this.state.editPage} />
        }
        else
            return (
                <Container>
                    <Row>
                        <Button onClick={this.goBackToList}>Back</Button>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Button onClick={this.goToEditPage}>Edit</Button>
                    </Row>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <Jumbotron><h1> hello {this.state.recruiter.username} </h1>
                                        ...you recruiting SOB</Jumbotron>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>descriptive title:</strong>  {this.state.recruiter.title}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                <strong> first name : </strong>   {this.state.recruiter.firstName}
                                </Col>
                                <Col>
                                <strong> phone number: </strong>  {this.state.recruiter.phone}
                                </Col>
                                <Col>
                                  <strong>last name : </strong>   {this.state.recruiter.lastName}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>

                                <Col>
                                    <strong>company name:</strong> {this.state.recruiter.companyName}
                                </Col>
                                <Col>
                                    <strong>company website:</strong> {this.state.recruiter.url}
                                </Col>
                                <Col>
                                <strong>  email: </strong> {this.state.recruiter.email}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <h2>job list</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>
                                    job title
                                </th>
                                <th>
                                    job description
                                </th>
                                <th>
                                    required skills
                                </th>
                                <th>
                                    salary
                                </th>
                                <th>
                                    location
                                </th>
                                <th>
                                    company website
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.jobs ? this.state.jobs : ' no jobs to display ' }
                        </tbody>
                    </Table>
                </Container>
            );
    }
}
        /*return (
             this.state.url ? <PDF name={this.props.studentInfo.firstName} url={this.state.url}/> : null 
        ) */

