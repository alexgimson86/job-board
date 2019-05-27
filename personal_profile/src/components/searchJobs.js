import React, { Component } from 'react';
import { Form, Button, Container, Jumbotron, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";

export default class SearchJobs extends Component {
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
        axios.post('http://localhost:4000/jobs/search/title', {searchString: this.props.location.state.searchString}).then(results => {
            let list = results.data.map(job => {
                var buttonStyle = {
                    'float': 'left'
                }
                return (
                    <ListGroup.Item key={job.id}>
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
        var buttonStyle = {
            'float': 'left'
        }
        if(this.state.back){
            return <Redirect to={this.state.back} />
        }
        else{
        return (
            <Container>
                <Button style={buttonStyle} onClick={this.goBack}>
                    back
                </Button>
                <Jumbotron>
                    <h4>search jobs by title with search string...</h4>
                    {this.props.location.state.searchString}
            </Jumbotron>
                <ListGroup>
                    {this.state.jobs ? this.state.jobs : ''}
                </ListGroup>
            </Container>
        )
        }
    }
}