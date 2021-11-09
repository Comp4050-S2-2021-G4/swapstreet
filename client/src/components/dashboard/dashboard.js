/* 
==========================================
 Author and Co-Authors: Faiyaz Rahman
 Last updated: 1 Nov 2021 04:08 PM
==========================================
*/
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './dashboard.css';

import ActiveListings from './activeListings';
import CurrentJobs from './currentJobs';
import History from './history';
import Info from './info';
import changeInfo from '../userProfile/changeInfo';
import Datafill from '../dataFill/dataFillPage';
import { isAuthenticated } from "../../auth/index";


class dashboard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
       //  Get user info if authenticated
        const {
            user: { _id, name, email, address, balance, role }
        } = isAuthenticated();
    
        var uID = this.props._id
        console.log("I am inside Dashboard now",uID);
        var myJobs = this.props.jobs
        myJobs = this.props.jobs.filter(function (job) { // job.userID === uID
           return job.jobStatus == 2;
        });

        var activeJobs = this.props.jobs
        activeJobs = this.props.jobs.filter(function (job) {
            return job.userID === uID && job.jobStatus !== 4;
        });

        var pastJobs = this.props.jobs
        pastJobs = this.props.jobs.filter(function (job) {
            return (job.userID === uID || job.chosenUserID === uID) && job.jobStatus === 4;
        });


        
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-">
                            
                        </div>
                        <div class="col-lg">
                            <Link to={{pathname: "/add", state: {prevLocation : "/dashboard"}}}><button className="btn btn-outline-primary btn-lg active">Create A New Job</button></Link>
                            <Info uID = {this.props.userID}/>
                            <changeInfo />
                            <CurrentJobs jobs={myJobs} userID={this.props.userID}/>
                            <ActiveListings jobs={myJobs} userID={this.props.userID}/>
                            <History jobs={myJobs} userID={this.props.userID}/>
                        </div>
                        <div class="col-">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default dashboard;
