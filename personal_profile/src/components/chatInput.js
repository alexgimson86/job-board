import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";
import { runInThisContext } from 'vm';


class Chat extends Component {
    constructor(props) {
        super(props);
         var socket = null
        this.state = {
            message: null,
            messages:[],
        }
    }
    componentDidMount(){
        this.initChat()
    }
    initChat = () => {
        this.socket = io('http://localhost:4000');
        this.socket.on('connect', () => {
            console.log('connected');
          });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    sendMessage = () => {
        let tempMessages = this.state.messages.push(this.state.message)
        this.setState({
            messages: tempMessages
        })
        this.socket.emit('message', {
            username : sessionStorage.getItem('myCurrentUsername'),
            message : this.state.messages,
         } )
    }
    handleClick = (e) => {
        //do stuff
    }
    goToSignup = () => {
        var toLogin = null;
        toLogin = "/signup"
        this.setState(() => {
            return { loginRedirect: "/signup" }
        })
        return <Redirect to={toLogin} />
    }
    render() {

        return (
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>messenger input</Form.Label>
                    <Form.Control onChange={this.handleChange} name="message" value={this.state.message} as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.sendMessage}>
                    Submit
  </Button>
            </Form>
        );
    }
}

export default Chat;