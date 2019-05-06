import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import { Container, Button, ListGroup, Table, Image, Row, Col, Jumbotron} from 'react-bootstrap'
import { Document, Page, pdfjs } from "react-pdf";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfileInfo: null,
      numPages: null,
      pageNumber: 1,
      pdfUrl: null,
      previousPage: null,
      editPage: null,
    }
  }
  componentDidMount() {
    let myId = this.props.location.state.myId
    axios({
      method: 'get',
      url: `http://localhost:4000/student/${myId}`,
      withCredentials: true,
    }).then(response => {
      this.setState({
        userProfileInfo: response.data,
        imageUrl: `http://localhost:4000/${response.data.imageUrl}`
        //fileUrl: `http://localhost:4000/${response.data.imageUrl}`
      })
      axios({
        method: 'get',
        url: `http://localhost:4000/resume/${myId}`,
      }).then( response => {
          this.setState({
            pdfUrl: `http://localhost:4000/${response.data}`
          })
      }

      )

    }).catch(err => {
      console.log(err);
    })
  }
  goToEditPage = () => {
    var editLink = `/edit/${this.state.userProfileInfo.username}`
    this.setState({
      editPage: editLink
    })
  }
  goBackToList = () => {
    var backLink = `/jobseekers/${this.state.userProfileInfo.username}`
    this.setState({
      previousPage: backLink
    })
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  render() {
    const { pageNumber, numPages } = this.state;
    const titleCSS = {
     'text-align': 'left'
    }
    if (!this.state.userProfileInfo) {
      return null;
    }
    else if(this.state.previousPage){
      return <Redirect to={this.state.previousPage} />
    }
    else if(this.state.editPage){
      return <Redirect to={this.state.editPage} />
    }
    else
    return (
        <Container>
          <Row>
            <Button onClick={this.goBackToList}>Back</Button>
            <Col>
            </Col>
            <Col>
            </Col>
            <Button onClick={this.goToEditPage}>Edit</Button>
          </Row>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={6} md={4}>
                  <Image src={this.state.imageUrl} rounded />
                </Col>
              <Col>
                  <Jumbotron><h1> hello {this.state.userProfileInfo.username} </h1>
                  ...you unemployed SOB</Jumbotron>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col style={titleCSS}>
                descriptive title:    {this.state.userProfileInfo.title}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                street address: {this.state.userProfileInfo.address.street}
                </Col>
                <Col>
                zip code: {this.state.userProfileInfo.address.zip}
                </Col>
                <Col>
                state: {this.state.userProfileInfo.address.state}
                </Col>
                <Col></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
            <Row>
              <Col>
              phone number: {this.state.userProfileInfo.phone}
              </Col>
              <Col>
              first Name : {this.state.userProfileInfo.firstName}
              </Col>
              <Col>
              last Name : {this.state.userProfileInfo.lastName}
              </Col>
              <Col>
              </Col>
            </Row>
              </ListGroup.Item>
          </ListGroup>
          <Table responsive>
            <thead>
              <tr>
                <Col>
                <th>Resume on file</th>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th>
              <Document 
                  onClick={this.handleClickedResume}
                  file={this.state.pdfUrl}
                  onLoadSuccess={this.onDocumentLoadSuccess}>
                  <Page 
                    pageNumber={pageNumber} />
              </Document>
              <p>Page {pageNumber} of {numPages}</p>
                </th>
              </tr>
            </tbody>
          </Table>
        </Container>
    );
  }
}
        /*return (
             this.state.url ? <PDF name={this.props.studentInfo.firstName} url={this.state.url}/> : null 
        ) */

