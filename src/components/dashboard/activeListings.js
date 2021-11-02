/* 
==========================================
 Author and Co-Authors: Faiyaz Rahman
 Last updated: 23 OCT 2021 07:34 PM
==========================================
*/
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import {Link} from "react-router-dom";

class activeListings extends Component {

    constructor(props) {
        super(props);
        this.state = props
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
                            
                            {job.jobStatus === 2 && job.userID === this.state.userID &&
                                <button className="btn btn-secondary btn-lg active">
                                    Someone Has Applied for this Job
                                </button>
                            }
                        </div>
                    </div>
                </Link>
            );
        })
        return (
            <div id="accordion">
                <div className="" id="headingTwo">
                    <h3 className="text-left btn-link mb-0 py-1" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="false" aria-controls="collapseTwo">
                        Your Active Listings
                    </h3>
                </div>

                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo"
                     data-parent="#accordion">
                    <div className="card-body currentJobs">
                        <div className="container">
                            <div className="row">
                                {jobList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default activeListings;
