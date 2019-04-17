import React, { Component } from 'react';
import { Form, Button, Container, Jumbotron, Row, Col, Nav} from 'react-bootstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: null,
            loginRedirect: null,
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        axios({
            method:'post',
            url: 'http://localhost:4000/student/login',
            data: {
                password: this.state.password,
                username: this.state.username,

            }, 
            withCredentials: true,
        }).then(response => {
            //document.cookie = `id=${response.data._id} path=/jobseekers/${response.data.username}`
                if(response.status === 200){
                    var link = `/jobseekers/${response.data.username}`
                    this.setState({
                        redirect: link,
                        userInfo: response.data
                    })
                    sessionStorage.setItem("myUsername", response.data.username);
                    // Retrieve    
            }
            })
            .catch(err => {
                alert("error bad login data")
                console.log(err)
            });
    }
    goToSignup = () => {
        var toLogin = null;
        toLogin = "/signup"
        this.setState(()=>{
          return  {loginRedirect: "/signup" }
        })
        return <Redirect to={toLogin } />
    }
    render() {
        if(this.state.loginRedirect){
            return <Redirect to={{ pathname: this.state.loginRedirect}} />
        }
        else if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect}} />
        }
        else {
            return (
                <Container>
                <Row>
                    <Nav.Link className="justify-content-start" onClick={this.goToSignup}>
                        SIGN UP
                    </Nav.Link>
                </Row>
                    <br /> <br />
                    <Jumbotron>LOGIN PAGE</Jumbotron>
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.handleClick}>
                                Submit
                        </Button>
                        </Form>;
                </Container>
                </Container >
            );
        }
    }
}
export default Login;