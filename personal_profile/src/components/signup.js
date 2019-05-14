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
            email: '',
            redirect: null,
            formRedirect: null,
            recruiterFormRedirect: null,
            student: false,
            recruiter: false,
            loginPage: null,
        }
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
        if(name === 'student'){
            this.setState({
                recruiter: false
            })
        }
        else if(name === 'recruiter'){
            this.setState({
                student: false
            })
        }
       
    }

    handleClick = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.passwordConfirm && this.state.student === true || this.state.recruiter === true) {
            axios({
                method: 'post',
                url: `http://localhost:4000/student/signup`,
                data: {
                    password: this.state.password,
                    username: this.state.username,
                    email: this.state.email,
                    student: this.state.student,
                    recruiter: this.state.recruiter,

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
            })
                .catch(err => {
                    alert("error bad login data")
                    console.log(err)
                });

        }
        else if (this.state.password === this.state.passwordConfirm && this.state.recruiter === true) {
            axios({
                method: 'post',
                url: `http://localhost:4000/recruiter/signup`,
                data: {
                    password: this.state.password,
                    username: this.state.username,
                    email: this.state.email,

                },
                withCredentials: true,
            }).then(results => {

            }).catch(err => {

            })
        }
        else {
            alert('passwords must match')
        }
    }
    goBack = () => {
        this.setState({
            loginPage: '/'
        })
    }
    render() {
        if (this.state.formRedirect) {
            return <Redirect to={{ pathname: this.state.formRedirect }} />
        }
        else if (this.state.redirect) {
            return <Redirect to={{ pathname: this.state.redirect }} />
        }
        else if (this.state.recruiterFormRedirect) {
            return <Redirect to={{ pathname: this.state.recruiterFormRedirect }} />
        }
        else if (this.state.loginPage) {
            return <Redirect to={{ pathname: this.state.loginPage }} />
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
                            <Form.Group controlId="formBasicPasswordConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="passwordConfirm" onChange={this.handleChange} value={this.state.passwordConfirm} placeholder="Confirm Password" />
                            </Form.Group>
                            <label>
                                Student{'  '}

                                <input
                                    name="student"
                                    type="checkbox"
                                    checked={this.state.student}
                                    onChange={this.handleChange} />

                            </label>
                            <br />
                            <label>
                                Recruiter{'  '}

                                <input
                                    name="recruiter"
                                    type="checkbox"
                                    checked={this.state.recruiter}
                                    onChange={this.handleChange} />
                            </label><hr />

                            <Button variant="primary" type="submit" onClick={this.handleClick}>
                                Submit
                        </Button>
                        <Button variant="secondary" type="button" onClick={this.goBack}>
                                Back
                        </Button>
                        </Form>
                    </Container>
                </Container >
            );
        }
    }
}
export default Signup;