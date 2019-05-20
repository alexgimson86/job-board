import React, { Component } from 'react';
import { Form, Button, Container, Jumbotron, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";

export default class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            back: null

        }
    }
    goBack = () => {
        let un = sessionStorage.getItem('myCurrentUsername')
        this.setState({
            back: '/recruiters/' + un
        })
    }
    componentDidMount() {
        axios.get('http://localhost:4000/job/' + this.props.match.params.username).then(results => {
            let list = results.data.map(job => {
                return (
                    <ListGroup.Item>
                        <Row> 
                            <Col><strong>job title: </strong>{job.title}</Col><Col><strong>job description: </strong> {job.jobDescription}</Col><Col><strong>location: </strong>{job.location}</Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col><strong>Company website: </strong>{job.url}</Col>
                            <Col><strong>skills: </strong>{job.skills}</Col>
                            <Col><strong>salary: </strong>{job.salary}</Col>
                        </Row>
                    </ListGroup.Item>)
            })
            this.setState({
                jobs: list
            })
        })


    }
    render() {
        if(this.state.back){
            return <Redirect to={this.state.back} />
        }
        else{
        return (
            <Container>
                <Button onClick={this.goBack}>
                    back
                </Button>
                <Jumbotron>
                    <h4> {this.props.match.params.username}'s</h4> jobs list
            </Jumbotron>
                <ListGroup>
                    {this.state.jobs ? this.state.jobs : ''}
                </ListGroup>
            </Container>
        )
        }
    }
}