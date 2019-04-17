import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/personalForm.css'
import axios from 'axios';

export default class Resume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resume: null,
            picture: null

        }
    }
    handleChange = (event) => {
        if(event.target.name === 'myFile')
            this.setState({resume: event.target.files[0]})
        else
            this.setState({picture : event.target.files[0]})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let form = new FormData();
        form.append('myFile', this.state.resume)
        form.append('myPic', this.state.picture)
        axios.post(`http://localhost:4000/resume/post/${this.props.username}`, form)
        .then((result)=>{
           alert("success")
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Upload Resume</label><div/>
                    <input type="file" name="myFile" onChange={this.handleChange} />
                </div>
                <div>
                <div className="form-group">
                    <label>Upload Picture</label><div/>
                    <input type="file" name="myPic" onChange={this.handleChange} />
                </div>
                    <button type="submit"   className="btn btn-primary">Submit Resume</button>
                </div>
                
            </form>
        )
    }
}
