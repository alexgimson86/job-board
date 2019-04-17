import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";
import PDF from './pdf';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Resumes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: null,
            numPages: null,
            pageNumber: 1,
            fileUrl: '',
            fileName: '',
        }
    }
    componentDidMount() {
        let url = `http://localhost:4000/resume/${this.props.studentInfo._id}`
        axios.get(url)
            .then(results => {
                let resultsUrl = `http://localhost:4000/${results.data}`

                this.setState({
                    fileUrl: resultsUrl,
                    fileName: results.data,
                })
            }).catch(err => {
                console.log(err)
            })
    }
    handleClickedResume = () => {
       var link = `/displayResumeBig/${this.state.fileName}`
       sessionStorage.setItem("jobApplicantResume", link)
       this.setState({
            redirectUrl: link
       })
        return 
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
        window.open( this.state.fileUrl, '_blank');
    }
    render() {
        const { pageNumber, numPages } = this.state;
        if(this.state.fileUrl){
        }
            return (
                <div>
                    <Document
                        onClick={this.handleClickedResume}
                        file={this.state.fileUrl}
                        onLoadSuccess={this.onDocumentLoadSuccess}>
                        <Page 
                         pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                </div>
            );
    }
}
        /*return (
             this.state.url ? <PDF name={this.props.studentInfo.firstName} url={this.state.url}/> : null 
        ) */

