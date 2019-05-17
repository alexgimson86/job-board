import React, { Component } from 'react';
import { Form, Button, Row, Col,  Container, Card, ButtonToolbar } from 'react-bootstrap'
import axios from 'axios'
import io from 'socket.io-client';
import uuid from 'uuid/v1';
import '../styles/chatroom.css';
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
                let returnMessages = results.data.map((doc, i) => (<Row><Col>{doc.username} said</Col><Col>{doc.message}</Col></Row>))
                this.setState({
                    messages: returnMessages
                })
            })
            this.scrollToBottom()

    }
   
    initChat = () => {
        this.socket = io.connect('http://localhost:4000');
        this.socket.on('append message', (data) => {
            let tempMessages = this.state.messages.concat(<Row><Col>{data.message.username} said </Col><Col>{data.message.message}</Col></Row>)
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
        
        this.setState({
            message: ''
        })
        
        this.socket.emit('chat message', {
            username: sessionStorage.getItem('myCurrentUsername'),
            message: this.state.message,
        })
    }
    componentDidUpdate(){
        if(document.getElementById('refreshView')){
            this.scrollToBottom();
        }
    }
    goBack = () => {
        var un = sessionStorage.getItem('myCurrentUsername')
        var link;
        if(this.props.location.state.isRecruiter) 
            link = `recruiters/${un}`
        else
            link = `jobseekers/${un}`
        this.setState({
            backToList: link
        })
    }
    scrollToBottom = () => {
        document.getElementById('refreshView').scrollIntoView({ behavior: "smooth" });
      }
      
      
      
     
    render() {
        if (this.state.backToList)
            return <Redirect to={this.state.backToList} />
        else
            return (
                <div className="chatroom">

                    <Container >
                        <div id="scrollDown">
                            {this.state.messages ? this.state.messages.map(messages => {
                                return <Card body style={{margin:'10px' }} key={uuid()}>{messages}</Card>
                            }) : ''}
                        </div>
                        <Container>
                            <div>
                                <br />
                            <div id="refreshView"></div>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control onChange={this.handleChange} name="message" value={this.state.message} as="textarea" rows="3" />
                                    </Form.Group>
                                    <ButtonToolbar>
                                        <Button onClick={this.goBack} variant="secondary">Back</Button>
                                        <Button variant="primary" type="submit" onClick={this.sendMessage}>
                                            Submit
  </Button>
                                    </ButtonToolbar>
                                </Form>
                            </div>
                        </Container>
                    </Container>
                </div>
            );
    }
}

export default Chat;