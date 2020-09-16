import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Table, Button, Container, Dropdown, DropdownButton, Tabs, Tab, Nav, Row, Col } from 'react-bootstrap'
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
            redirectToMessages: null,
            addJobsPage: null,
            redirectToSearch: null,
            searchString: "",
            searchMethod: "title",
            searchPlaceholder: "search by job title"

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
    goToSearch = () => {
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

                if (i === 0) {
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
    goToMessages = () => {
        let myUsername = sessionStorage.getItem("myCurrentUsername");
        this.setState({
            redirectToMessages: `/${myUsername}/inbox`
        })
    }
    setSearch = (event) =>{
            let s = `search by job ${event.target.id}`
            this.setState({
                searchMethod: event.target.id,
                searchPlaceholder: s,
            })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        else if (this.state.redirectToSearch) {
            return <Redirect to={{ pathname: this.state.redirectToSearch, state: { searchString: this.state.searchString, searchMethod: this.state.searchMethod } }} />
        }

        else if (this.state.redirectToProfile) {
            return <Redirect to={{ pathname: this.state.redirectToProfile, state: { myId: this.state.myInfo.key } }} />
        }
        else if (this.state.redirectToChat) {
            return <Redirect to={{ pathname: this.state.redirectToChat, state: { isRecruiter: false } }} />
        }
        else if (this.state.redirectToMessages) {
            return <Redirect to={{ pathname: this.state.redirectToMessages }} />
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
                            <Nav.Link className="justify-content-end" onClick={this.goToChat}>                  chat board
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="justify-content-end" onClick={this.goToProfile}>                    {this.props.match.params.username}
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="justify-content-end" onClick={this.goToMessages}>
                                messages
                            </Nav.Link>
                        </Nav.Item>
                    <Col></Col>
                    <Nav.Item>
                    
                        search by {this.state.searchMethod}:{' '}
                        <input id="searchBar" size="25" type="text" placeholder={this.state.searchPlaceholder} />
                    </Nav.Item>
                    <Nav.Item>
                        <Button onClick={this.goToSearch}>go</Button>
                    </Nav.Item>
                    <Nav.Item>
                        <DropdownButton variant="secondary" id="dropdown-basic-button" title="options">
                            <Dropdown.Item  onClick={this.setSearch} id="title">search job title</Dropdown.Item>
                            <Dropdown.Item onClick={this.setSearch} id="description">search job description</Dropdown.Item>
                            <Dropdown.Item  onClick={this.setSearch} id="location">search job location</Dropdown.Item>
                        </DropdownButton>
                    </Nav.Item>
                    </Nav>
                    <br />
                    <br />
                    <Container >
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
