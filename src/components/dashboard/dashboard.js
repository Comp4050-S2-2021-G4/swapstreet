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


class dashboard extends Component {

    render() {
       //  Get user info if authenticated
        const uID = this.props._id
        console.log("I am inside Dashboard now",uID);
        let myJobs = this.props.jobs.filter(function (job) { // job.userID === uID
           return job.jobStatus === 2;
        });

        const activeJobs = this.props.jobs.filter(function (job) {
            return job.userID === uID && job.jobStatus !== 4;
        });

        const pastJobs = this.props.jobs.filter(function (job) {
            return (job.userID === uID || job.chosenUserID === uID) && job.jobStatus === 4;
        });

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-">
                            
                        </div>
                        <div className="col-lg">
                            <Link to={{pathname: "/add", state: {prevLocation : "/dashboard"}}}><button className="btn btn-outline-primary btn-lg active">Create A New Job</button></Link>
                            <Info uID = {this.props.userID}/>
                            <changeInfo />
                            <CurrentJobs jobs={myJobs} userID={this.props.userID}/>
                            <ActiveListings jobs={activeJobs} userID={this.props.userID}/>
                            <History jobs={pastJobs} userID={this.props.userID}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default dashboard;
