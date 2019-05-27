import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Table, Button, Container, ButtonToolbar, Tabs, Tab, Nav, Row, Col } from 'react-bootstrap'
import RecruiterComponent from './recruiterComponent';
import Profile from './profile';
export default class RecruiterList extends Component {
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
            redirectToSearch: null,
            searchString: "",

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
    studentList = (recruiter) => {
        return <RecruiterComponent key={recruiter._id} recruiterInfo={recruiter} />
    }

    goToProfile = () => {
        let myUsername = sessionStorage.getItem("myCurrentUsername");
        let link = `/profilePage/${myUsername}`;
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
    goToSearch = () =>{
        var search = document.getElementById('searchBar').value;

        this.setState({
            searchString: search,
            redirectToSearch: '/searchJobs',
        }) 
    }
    componentDidMount() {
        axios.get('http://localhost:4000/recruiter',
            { withCredentials: true }
        ).then(results => {
            let otherUsersList = [];
            let myUserInformation = {};
            let myUsername = sessionStorage.getItem("myCurrentUsername");
        
            results.data.forEach((recruiters, i) => {

                if (i === 0){
                    var myInfo = recruiters[0]
                    myUserInformation = this.studentList(myInfo)
                }
                else
                otherUsersList.push(this.studentList(recruiters));
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
        else if (this.state.redirectToSearch) {
            return <Redirect to={{ pathname: this.state.redirectToSearch, state:{ searchString: this.state.searchString }}} />
        }
       
        else if (this.state.redirectToProfile) {
            return <Redirect to={{ pathname: this.state.redirectToProfile, state: { myId: this.state.myInfo.key } }} />
        }
        else if(this.state.redirectToChat){
            return <Redirect to={{ pathname: this.state.redirectToChat, state: { isRecruiter: false } }} />
        }
        else {
            let searchCSS = {
                float: 'right',
            }
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
                        <br></br>
                        
                    </Nav>
                    <div >
                        <span style={searchCSS}>
                        search by title{"   "}
                        <input   id="searchBar" type="text" placeholder="Search by title.."/>{' '}
                        <Button onClick={this.goToSearch}>go</Button>
                        </span>
                        <br/>
                    </div>
                    <br />
                    <Container>
                        <Table hover responsive>
                            <thead>
                                <tr>
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
