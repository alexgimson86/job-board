import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import { Document, Page, pdfjs } from "react-pdf";
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class DisplayResumeBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PDFUrl: null,
            numPages: null,
            pageNumber: 1,
        }
    }
    componentDidMount(){
        var link = sessionStorage.getItem('jobApplicantResume')
        this.setState({
            PDFUrl:  link
        })
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }
    render() {
              const { pageNumber, numPages } = this.state;
              return (
                <div> 
                  <Document
                    file={this.state.PDFUrl}
                    onLoadSuccess={this.onDocumentLoadSuccess}>
                    <Page style={{  backgroundColor: 'beige', height: 300
                                     }} pageNumber={pageNumber}/>
                  </Document>
                  <p>Page {pageNumber} of {numPages}</p>
                </div>
              );
            }
          }
        /*return (
             this.state.url ? <PDF name={this.props.studentInfo.firstName} url={this.state.url}/> : null 
        ) */

