import React, { Component , useState} from '../../../node_modules/react';
import {Link} from "react-router-dom";
import './homePage.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults : this.props.jobs
    };

  }

  handleSelect (e) {
    this.setState({location : e})
  }

  searchData = e => {
    const queryResult = e.target.value;

    if(e === ""){
        this.state = {
          searchResults : this.props.jobs
        };
        return;
    }

    let data = []

    this.props.jobs.forEach(e => {
        if(e.description.toLowerCase().search(queryResult.toLowerCase()) !== -1 
        || e.title.toLowerCase().search(queryResult.toLowerCase()) !== -1
        || e.location.toLowerCase().search(queryResult.toLowerCase()) !== -1){
            data.push(e);
        }
    });

    this.setState({ searchQuery: e.target.value, searchResults: data })
  }
  
  handleSubmit = e => {
    e.preventDefault()
  }
  
  render() {
    if(this.state.searchResults.length === 0){
      this.state = {
        searchResults : this.props.jobs
      };
    }
 
    let jobList = this.state.searchResults.map(job => {
      return (job.userID != this.props.userID && job.jobStatus !== 4 &&
        <Link className="job" to={{pathname: "/job", state: {job: job, prevLocation : "/"}}}>
        <div className="homeCard border-dark mb-3">
          <div className="homeCardBody text-dark">
              <h5 className="card-title">{job.title}</h5>
              <p className="card-text">{job.description}</p>
          </div>
          <div className="card-footer bg-transparent border-dark">
            <p className="homeJobLocation">Location: {job.location}</p>
            <p className="homeJobCost">Cost: {job.price}</p>
          </div>
        </div>
        </Link>
      );
    })
    
    return (
      <div className= "homePage">
        
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            id="Search"
            onChange={this.searchData}
          />
        </form>
      <div className="homeContainer">
        <div className="row">
            {jobList}
        </div>
      </div>
      </div>

    )
  }

}

export default HomePage;