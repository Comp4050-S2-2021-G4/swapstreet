/* 
==========================================
 Author and Co-Authors: Faiyaz Rahman
 Last updated: 1 Nov 2021 04:08 PM
==========================================
*/
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class history extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let jobList = this.props.jobs.map(job => {    
            return (
                <Link className="job" to={{pathname: "/job", state: {job: job, prevLocation : "/dashboard"}}}>
                    <div class="card border-dark mb-3 dash-card">
                        <div class="card-body text-dark dash-card-body">
                            <h5 class="card-title">{job.title}</h5>
                            <p class="card-text">{job.description}</p>
                        </div>
                        <div class="card-footer bg-transparent border-dark">
                            <p className="jobLocation">Location: {job.location}</p>
                            <p className="jobPrice">Cost: {job.price}</p>
                        </div>
                    </div> 
                </Link>
            );
        })
        return (
            <div className="accordion">
                <div className="" id="headingThree">
                    <h3 className="text-left mb-0 btn-link py-1" data-toggle="collapse" data-target="#collapseThree"
                    aria-expanded="false" aria-controls="collapseThree">
                        Your Past Jobs
                    </h3>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                     data-parent="#accordion">
                    <div className="card-body pastJobs">
                        <div className="container">
                            <div className="row">
                                {jobList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default history;