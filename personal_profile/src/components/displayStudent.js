import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Modal, Button, ListGroup, ListGroupItem, ModalBody } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobSeekers from './jobSeekers';
import ModalFunc from './modalFunc'

export default class DisplayStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            studentData: null,
            renderModule: false
        }
    }
    
    componentDidMount(){
        this.setState({
            id: this.props.studentInfo.key,
            renderModule: true
        })
        let url = `http://localhost:4000/student/${this.props.studentInfo.key}`
        axios.get(url)
            .then(results => {
                let na = 'N/A'
                let s = results.data;

                this.setState({
                    studentData: s
                })
            }).catch(err => {
                console.log(err)
            })
    }
   
    
    render() {
        return (
         ''
        )
    }
}
