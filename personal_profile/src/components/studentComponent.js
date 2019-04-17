import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
//import DisplayStudent from './displayStudent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from 'react-bootstrap'
import ModalFunc from './modalFunc'

export default class StudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentData: null,
            display: false,

        }
    }
    handleClick = () => {
        this.setState(state => {
            return { display: !state.display }
        })


    }
    constructStudent = (student) => {
        let imgU = "http://localhost:4000/" + student.imageUrl;
        let URL = `/studentModule/${student._id}`
        var words = null
        var modString = '';
        if(student.title){
             words = student.title.split(' ');
            if (words.length > 10) {
                words.forEach( (element, i) => {
                    if(i < 10)
                        modString += element + ' '
                });
                modString += '...'
            }
            else 
             modString = student.title
        }

        return (

            <tr key={student._id}>
                <td key="image"><img src={imgU} className="img-thumbnail float-left" alt="no pic"></img>
                </td>
                <td key="fNameLname">{student.firstName}{'  '}{student.lastName}</td>
                <td key="title">{modString}
                </td>
                <td>
                    <Link to={URL} onClick={this.handleClick}>
                        click to see full report
                </Link>
                </td>
            </tr>
        )
    }
    componentDidMount() {
        let data = this.constructStudent(this.props.studentInfo)
        this.setState({
            studentData: data
        })
    }
    render() {
        return (
                <Router>
                        <tbody>
                            {this.state.studentData ? this.state.studentData : ""}
                        </tbody>
                        <Route exact path='/studentModule/:id' render={() => <ModalFunc studentInfo={this.props.studentInfo} display={this.state.display} handleClick={this.handleClick} />}/>
                </Router>

        )
    }
}
