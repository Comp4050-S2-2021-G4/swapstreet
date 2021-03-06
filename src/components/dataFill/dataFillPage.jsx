/* 
==========================================
 Title: datafill
 Author and Co-Authors: Jayakrithi, Faiyaz Rahman  
 Last updated: 2 Nov 2021
==========================================
*/

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
const axios = require('axios').default;

class jobDataFill extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firebaseUser: this.props.firebaseUser,
            name: this.props.name,
            type: this.props.location.pathname,
            userID: this.props.userID,
            job: this.props.location.state.job,
            jobID:'', 
            chosenUserID: '',  
            jobStatus: '',  
            rating: '', 
            title: '',  
            description : '',  
            price: '',    
            location: ''
        }
        console.log(`dataFillPage#constructor:14`, this.state.firebaseUser.user.uid);
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount(){
        this.state.type === "/add" ? this.updateVariables() : this.newJob()
    }

    submitData(event) {
        // Might cause an Error
        event.preventDefault(); 
        const newJob = {
                userID : this.state.userID.$oid,
                title : this.title.value,
                description: this.desc.value,
                price : this.price.value,
                location : this.location.value,
                firebaseUserId: this.state.firebaseUser.user.uid,
                posterName: this.state.name,
            }
            console.log(newJob);

        axios.post('http://localhost:3200/jobs/add', newJob)
            .then( _ => {
                window.location.href = "/";
            })
            .catch(e => {
                console.log(`dataFillPage#:63`, e);
            })
    }

    newJob(){
        this.jobStatus = 1
        this.chosenUserID = ""
    }

    updateVariables(){
    }

    render() {
        return (
            <div style={{margin : "10px"}}>

                <form onSubmit={a => this.submitData(a)}>

                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" id="titleInput" ref={(input) => this.title = input} placeholder="Enter Title"/>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" id="descInput" ref={(input) => this.desc = input} placeholder="Enter Description"/>
                    </div>                   

                    <div className="form-group">
                        <label>Job Price</label>
                        <input type="number" className="form-control" id="priceInput" placeholder="Enter Price" ref={(input) => this.price = input}/>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" id="locationInput" placeholder="Enter Location" ref={(input) => this.location = input}/>
                    </div>

                    <div className="form-group">
                        <label>jobStatus</label>
                        <select className="form-control form-control-sm" id="jobStatusInput" ref={(input) => this.jobStatus = input}>
                            <option selected='selected'>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    {this.state.type === "/edit" && (
                        <div className="form-group">
                            <label>chosenUserID</label>
                            <input type="text" className="form-control" id="jobChosenUserIDInput" ref={(input) => this.chosenUserID = input} placeholder="Enter User ID"/>
                        </div>)
                    }

                    <span> 
                        <button type="submit" className="btn btn-primary btn-lg active">{this.state.type === "/edit" ? "Apply" : "Create"}</button>
                        <Link to="/dashboard">
                            <button className="btn btn-danger btn-lg active">
                                Cancel
                            </button>
                        </Link>
                    </span>

                </form>

            </div>
        );
    }
}

export default jobDataFill;