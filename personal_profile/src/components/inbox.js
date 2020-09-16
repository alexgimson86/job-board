import React, { Component } from 'react';
import { Form, Button,Breadcrumb, Container, Jumbotron, Row, Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";

export default class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message : "",
            to : "",
            goBack : null
        }
        this.getMessages();
    }
    getMessages = () =>{
        let un = sessionStorage.getItem('myCurrentUsername');   
        axios({
            method: 'get',
            url: `http://localhost:4000/getMessages`,
            data: {
                username: un
            },
        }).then(response => { 
            if(response.data.length > 0){
                var el = document.getElementById('inbox');
                el.style.color = 'red';


            }
        });  
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleClick = (e) => {
        let un = this.sessionStorage.getItem('myCurrentUsername');           
        axios({
            method: 'post',
            url: `http://localhost:4000/send_message`,
            data: {
                to: this.state.to,
                message: this.state.message,
                from: un
            },
            withCredentials: true,
        }).then(response => {
            //document.cookie = `id=${response.data._id} path=/jobseekers/${response.data.username}`
            if (response.data.username) {
                let toForm = `/signup/${response.data.username}`
                sessionStorage.setItem("myCurrentUsername", response.data.username);
                if (this.state.student) {
                    this.setState(() => {
                        return { formRedirect: toForm }
                    })
                }
                else {
                    let toRecruiterForm = `/recruiterSignup/${response.data.username}`
                    this.setState(() => {
                        return { recruiterFormRedirect: toRecruiterForm }
                    })
                }
            }
            else{
                window.alert('choose new username')
            }
        }).catch(err => {
            alert("error bad login data")
            console.log(err)
        });
    }
    goBack = () => {
        let myUsername = sessionStorage.getItem("myCurrentUsername");
        let link = '/recruiters/' +  myUsername;
        this.setState({
            goBack: link
        })
    }
    render() {
        if (this.state.goBack) {
            return <Redirect to={{ pathname: this.state.goBack }} />
        }
        return (<Container>
             
                    <Breadcrumb>
                        <Breadcrumb.Item active href="http://localhost:3000/composeMessage">compose message</Breadcrumb.Item>
                        <Breadcrumb.Item href="http://localhost:3000/inbox/" id="inbox">
                        inbox
                        </Breadcrumb.Item>
                            <Breadcrumb.Item>sent messages</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form>
                        <Form.Group>
                            <Form.Label>To username:</Form.Label>
                            <Form.Control type="text" name="to" style={{width:"30%"}} onChange={this.handleChange} value={this.state.to} placeholder="Enter username want to message"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Message:</Form.Label><br/>
                            <textarea name="message" style={{width:"50%"}} onChange={this.handleChange} value={this.state.message} placeholder="Enter message"></textarea>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleClick}>
                                Submit
                        </Button>
                        <Button variant="secondary" type="button" onClick={this.goBack}>
                                Back
                        </Button>
                    </Form>
                   
                </Container>);
    }
}
