import React, { Component } from 'react';
import { Form, Button, Container, ListGroup, ButtonToolbar } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client';
import uuid from 'uuid/v1';
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
            message: '',
            messages: [],
            backToList: null,
        }
    }
    componentDidMount() {
        this.initChat()
        axios.get('http://localhost:4000/get_messages')
            .catch(err => {
                console.log(err)
            }).then(results => {
                let returnMessages = results.data.map((doc, i) => `${doc.username} said  ${doc.message}`)
                this.setState({
                    messages: returnMessages
                })
            })

    }
    initChat = () => {
        this.socket = io.connect('http://localhost:4000');
        this.socket.on('append message', (data) => {
            let tempMessages = this.state.messages.concat( `${data.message.username} said ${data.message.message}`)
            this.setState({
                messages: tempMessages,
            })
        }
        )


    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    sendMessage = (event) => {
        event.preventDefault();
        let user = sessionStorage.getItem('myCurrentUsername')
        axios({
            method: 'post',
            url: 'http://localhost:4000/post_message',
            data: {
                message: this.state.message,
                username: user
            }
        })

       /* let tempMessages = this.state.messages.concat( `${user} said ${this.state.message}` )
        this.setState({
            messages: tempMessages,
        })*/


        this.socket.emit('chat message', {
            username: sessionStorage.getItem('myCurrentUsername'),
            message: this.state.message,
        })
    }
    goBack = () => {
        var un = sessionStorage.getItem('myCurrentUsername')
        var link = `jobseekers/${un}`
        this.setState({
            backToList: link
        })
    }
    render() {
        if (this.state.backToList)
            return <Redirect to={this.state.backToList} />
        else
            return (
                <Container>


                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>messenger input</Form.Label>
                            <Form.Control onChange={this.handleChange} name="message" value={this.state.message} as="textarea" rows="3" />
                        </Form.Group>
                        <ButtonToolbar>

                            <Button onClick={this.goBack} variant="secondary">Back</Button>
                            <Button variant="primary" type="submit" onClick={this.sendMessage}>
                                Submit
  </Button>
                        </ButtonToolbar>
                    </Form>
                    <ListGroup>
                        {this.state.messages ? this.state.messages.map (messages => {
                           return <ListGroup.Item key={uuid()}>{messages}</ListGroup.Item>
                        }) : ''}
                    </ListGroup>
                </Container>
            );
    }
}

export default Chat;