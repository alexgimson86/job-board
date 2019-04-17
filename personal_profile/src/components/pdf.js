import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {  Container, Row, Col } from 'react-bootstrap'
const pdf = (props) => (
    <div>
        <br />
        <Container>
            <Row  className="justify-content-md-center">
            <Col>
            {props.name}'s Resume
            </Col>
            </Row>
            <Row  className="justify-content-md-center">
                <Col>
                <embed alt="resume" src={props.url} type="application/pdf" width='500px' height="500px" />
                </Col>
            </Row>
        </Container>
    </div>
)

export default pdf