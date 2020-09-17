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
            to : "",
            goBack : null,
            me:  null,
            messages: [],
            boardHtml: null

        }
    }
    componentDidMount(){
        this.getMessages();
    }
    getMessages = () =>{
        let un = sessionStorage.getItem('myCurrentUsername');   
        this.setState({
            me: un
        })
        axios({
            method: 'get',
            url: `http://localhost:4000/getMessages/${un}`
        }).then(response => { 
            var data = response.data;
            this.setState({
                messages: data
            }, ()=>{
                var tempBoard = null;
            this.state.messages.forEach( message => {
                    tempBoard += `<tr><td>${message.from}</td><td>${message.message}</td><td>${message.date}</td></tr>`;
            })  
            this.setState({
                boardHtml: tempBoard
            });
            })
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
                        <Breadcrumb.Item href={`http://localhost:3000/composeMessage/${this.props.match.params.username}`}>compose message</Breadcrumb.Item>
                        <Breadcrumb.Item active href={`http://localhost:3000/inbox/${this.props.match.params.username}`} id="inbox">
                        inbox
                        </Breadcrumb.Item>
                            <Breadcrumb.Item>sent messages</Breadcrumb.Item>
                    </Breadcrumb>
                    <table width="100%" dangerouslySetInnerHTML={{__html: this.state.boardHtml}}>
                    </table>

                </Container>);
    }
}

