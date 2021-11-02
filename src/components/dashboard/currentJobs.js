import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import {Link} from "react-router-dom";

class currentJobs extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let jobList = this.props.jobs.map(job => {
            return (
                <Link className="job" to={{ pathname: "/job", state: { job: job, prevLocation: "/dashboard" } }}>
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
        });
        return (
            <div id="accordion">
                <div className="" id="headingOne">
                    <h3 className="mb-0 text-left btn-link py-1" data-toggle="collapse" data-target="#collapseOne"
                        aria-expanded="false" aria-controls="collapseOne">
                        Your Current Jobs
                    </h3>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
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

export default currentJobs;

