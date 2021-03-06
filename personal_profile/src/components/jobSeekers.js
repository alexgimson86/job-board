import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Table, Button, Container, ButtonToolbar, Tabs, Tab, Nav, Row, Col } from 'react-bootstrap'
import StudentComponent from './studentComponent';
import Profile from './profile';
export default class JobSeekers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mappedList: null,
            display: true,
            redirect: null,
            username: null,
            myInfo: null,
            redirectToProfile: null,
            redirectToChat: null,
            addJobsPage: null,
        }
    }
    handleLogout = () => {
        axios.get('http://localhost:4000/logout',
            { withCredentials: true }
        ).then(results => {
            this.setState({ redirect: '/' })
        }).catch(err => {
            console.log(err);
        })
    }
    display = () => {
        let toDisplay = this.state.display;
        this.setState({
            display: !toDisplay,
        })
    }
    studentList = (student) => {
        return <StudentComponent key={student._id} studentInfo={student} />
    }

    goToProfile = () => {
        let myUsername = sessionStorage.getItem("myCurrentUsername");
        let link = `/recruiterProfilePage/${myUsername}`;
        this.setState({
            redirectToProfile: link
        })
    }
    goToChat = () => {
        let link = `/chat`;
        this.setState({
            redirectToChat: link
        })
    }
    goToAddJobs = () => {
        let myUsername = sessionStorage.getItem("myCurrentUsername");
        let link = `/addJobs/${myUsername}`
        this.setState({
            addJobsPage: link
        })

    }
    componentDidMount() {
        axios.get('http://localhost:4000/student',
            { withCredentials: true }
        ).then(results => {
            let otherUsersList = [];
            let myUserInformation = {};
            let myUsername = sessionStorage.getItem("myCurrentUsername");
            results.data.forEach((student) => {
                if (student.username !== myUsername)
                    otherUsersList.push(this.studentList(student));
                else
                    myUserInformation = this.studentList(student)
            })
            this.setState({
                mappedList: otherUsersList,
                myInfo: myUserInformation
            })

        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        else if (this.state.addJobsPage) {
            return <Redirect to={{ pathname: this.state.addJobsPage }} />
        }
        else if (this.state.redirectToProfile) {
            return <Redirect to={{ pathname: this.state.redirectToProfile, state: { myId: this.state.myInfo.key } }} />
        }
        else if(this.state.redirectToChat){
            return <Redirect to={{ pathname: this.state.redirectToChat, state: { isRecruiter: true }}} />
        }
        else {
            return (
                <Container>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link className="justify-content-start" onClick={this.handleLogout}>
                                log out
                            </Nav.Link>     
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="justify-content-end" onClick={this.goToChat} eventKey="link-1">                  chat board
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="justify-content-end" onClick={this.goToProfile} eventKey="link-1">                    {this.props.match.params.username}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="justify-content-end" onClick={this.goToAddJobs} eventKey="link-1">                    add jobs
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <br />
                    <Container>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>image</th>
                                    <th>name</th>
                                    <th>introduction</th>
                                    <th>more details</th>
                                </tr>
                            </thead>
                            {this.state.mappedList ? this.state.mappedList : ""}
                        </Table>
                    </Container>
                </Container>

            )
        }
    }
}
