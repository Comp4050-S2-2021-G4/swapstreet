import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import {Link} from "react-router-dom";

class currentJobs extends Component {

    render() {
        let jobList = this.props.jobs.map(job => {
            return (
                <Link className="job" to={{ pathname: "/job", state: { job: job, prevLocation: "/dashboard" } }}>
                    <div className="card border-dark mb-3 dash-card">
                        <div className="card-body text-dark dash-card-body">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text">{job.description}</p>
                        </div>
                        <div className="card-footer bg-transparent border-dark">
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
                        aria-controls="collapseOne">
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

