import React, { Component } from 'react';
import { Form, Button, Container, ListGroup } from 'react-bootstrap'
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
        axios.get('http://localhost:4000/get_messages')
        .catch(err => {
            console.log(err)
        }).then(results =>{
            let returnMessages = results.data.map(( doc, i )=> <ListGroup.Item key={i}>{doc.username} said  {doc.message}</ListGroup.Item>)
            this.setState({
                messages: returnMessages
            })
        })
        
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


    sendMessage = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:4000/post_message',
            data: {
                message: this.state.message,
                username: sessionStorage.getItem('myCurrentUsername')
            }
        })
       
        let tempMessages = this.state.messages.concat(this.state.message)
        this.setState({
            messages: tempMessages,
        })
        this.socket.emit('chat message', {
            username : sessionStorage.getItem('myCurrentUsername'),
            message : this.state.message,
        })
    }
    render() {

        return (
            <Container>

            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>messenger input</Form.Label>
                    <Form.Control onChange={this.handleChange} name="message" value={this.state.message} as="textarea" rows="3" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.sendMessage}>
                    Submit
  </Button>
            </Form>
            <ListGroup>
            {this.state.messages ? this.state.messages : ''}
            </ListGroup>
            </Container>
        );
    }
}

export default Chat;