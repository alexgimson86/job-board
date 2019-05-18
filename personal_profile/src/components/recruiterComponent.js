import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
//import DisplayStudent from './displayStudent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import ModalFunc from './modalFunc'

export default class RecruiterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiterData: null,
            display: false,

        }
    }
    handleClick = () => {
        this.setState(state => {
            return { display: !state.display }
        })


    }
    constructStudent = (recruiter) => {
        let URL = `/recruiterModule/${recruiter._id}`
        var words = null
        var modString = '';
        if(recruiter.title){
             words = recruiter.title.split(' ');
            if (words.length > 10) {
                words.forEach( (element, i) => {
                    if(i < 10)
                        modString += element + ' '
                });
                modString += '...'
            }
            else 
             modString = recruiter.title
        }
        let link = `jobsList/${recruiter.username}`
        return (

            <tr key={recruiter._id}>
                <td key="fNameLname">{recruiter.firstName}{'  '}{recruiter.lastName}</td>
                <td key="title">{modString}
                </td>
                <td>
                    <Link to={link} onClick={this.handleClick}>
                        click here to see jobs
                </Link>
                </td>
            </tr>
        )
    }
    componentDidMount() {
        let data = this.constructStudent(this.props.recruiterInfo)
        this.setState({
            recruiterData: data
        })
    }
    render() {
        return (
                <Router>
                        <tbody>
                            {this.state.recruiterData ? this.state.recruiterData : ""}
                        </tbody>
                        <Route exact path='/recruiterModule/:id' render={() => <ModalFunc studentInfo={this.props.recruiterInfo} display={this.state.display} handleClick={this.handleClick} />}/>
                </Router>

        )
    }
}
