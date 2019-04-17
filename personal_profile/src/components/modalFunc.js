import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobSeekers from './jobSeekers';
import Resumes from './resumes';


const ModalFunc = (props) => {


    let na = "N/A"
    let resumeLink = `/resumes/${props.studentInfo._id}`
    if (props.studentInfo)
        var url = `http://localhost:4000/${props.studentInfo.imageUrl}`
    return (
        <Modal
            size='lg'
            show={props.display}
            onHide={props.handleClick}>
            <Modal.Header>
                <Modal.Title>
                    <span>
                        <img alt="no pic" src={url} />
                    </span>
                    <span>
                        {' '}{props.studentInfo.firstName ? props.studentInfo.firstName : na}
                        {' '}{props.studentInfo.lastName ? props.studentInfo.lastName : na}
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>
                    Introduction
                            </h4>
                <p>
                    {props.studentInfo.title ? props.studentInfo.title : na}
                </p>
                <ListGroup>
                    <ListGroupItem>
                        street address:    {props.studentInfo.address.street ? props.studentInfo.address.street : na}
                    </ListGroupItem>
                    <ListGroupItem>
                        state and zip:   {props.studentInfo.address.state}, {props.studentInfo.address.zip}
                    </ListGroupItem>
                    <ListGroupItem>
                        country:    {props.studentInfo.address.country ? props.studentInfo.address.country : na}
                    </ListGroupItem>
                    <ListGroupItem>
                        phone:   {props.studentInfo.phone ? props.studentInfo.phone : na}
                    </ListGroupItem>
                    <ListGroupItem>
                        email:   {props.studentInfo.email ? props.studentInfo.email : na}
                    </ListGroupItem>

                </ListGroup>
                <br/><br/>
                <Router>
                    <Link to={resumeLink} >
                        <Button variant="primary">View Resume
                        </Button>{' '}
                    </Link>
                    <Link to="/">
                        <Button variant="secondary" onClick={props.handleClick}>
                            Close
                            </Button>
                    </Link>
                    <Route exact path="/resumes/:id" render={()=>(<Resumes studentInfo={props.studentInfo}/>)}/>

                </Router>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>)

}

export default ModalFunc