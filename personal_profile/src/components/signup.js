import React, { Component } from 'react';
import { Form, Button, Container, Jumbotron } from 'react-bootstrap'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            email:'',
            redirect: null,
            formRedirect: null,
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClick = (e) => {
        e.preventDefault();
        if( this.state.password === this.state.passwordConfirm ){
        axios({
            method:'post',
            url: `http://localhost:4000/student/signup`,
            data: {
                password: this.state.password,
                username: this.state.username,
                email: this.state.email,

            }, 
            withCredentials: true,
        }).then(response => {
            //document.cookie = `id=${response.data._id} path=/jobseekers/${response.data.username}`
            let toForm = `/signup/${response.data.username}`
            this.setState(()=>{
                return  {formRedirect: toForm }
              })
              return <Redirect to={toForm} />
            })
            .catch(err => {
                alert("error bad login data")
                console.log(err)
            });
        }
        else{
            alert('passwords must match')
        }
    }
    render() {
        if(this.state.formRedirect){
            return <Redirect to={{ pathname: this.state.formRedirect}} />
        }
        else if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect}} />
        }
        else {
            return (
                <Container>
                    <br /> <br />
                    <Jumbotron>SIGNUP PAGE</Jumbotron>
                    <Container>
                        <Form>
                            <Form.Group controlId="text">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>email</Form.Label>
                                <Form.Control type="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter email" />
                            </Form.Group>
                            
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="passwordConfirm" onChange={this.handleChange} value={this.state.passwordConfirm} placeholder="Confirm Password" />
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
export default Signup;