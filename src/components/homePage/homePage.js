import React, { Component, useState } from '../../../node_modules/react';
import { Link } from "react-router-dom";
import './homePage.css';
import {isAuthenticated } from "./../../auth/index"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import {Jumbotron} from "react-bootstrap";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: this.props.jobs
    };

  }

  handleSelect(e) {
    this.setState({ location: e })
  }

  searchData = e => {
    const queryResult = e.target.value;

    if (e === "") {
      this.state = {
        searchResults: this.props.jobs
      };
      return;
    }

    let data = []

    this.props.jobs.forEach(e => {
      if (e.description.toLowerCase().search(queryResult.toLowerCase()) !== -1
        || e.title.toLowerCase().search(queryResult.toLowerCase()) !== -1
        || e.location.toLowerCase().search(queryResult.toLowerCase()) !== -1) {
        data.push(e);
      }
    });

    this.setState({ searchQuery: e.target.value, searchResults: data })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    if (this.state.searchResults.length === 0) {
      this.state = {
        searchResults: this.props.jobs
      };
    }

    // takes care of listing jobs when user is logged in
    // joblists consists of user jobs
    let jobList = this.state.searchResults.map(job => {
      return (job.userID != this.props.userID && job.jobStatus !== 4 &&
        <Link className="job" to={{ pathname: "/job", state: { job: job, prevLocation: "/" } }}>
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
    // homepage 
    // row class is completely assigned to jobLists
    return (
      <div className="homePage">
        <div className = "about-section">
        <Jumbotron> 
        <h1> Welcome to SwapStreet </h1>
        <h5> Platform to bring community together</h5>
        </Jumbotron>
        <div className="homeContainer">
          <div className="row">
            {isAuthenticated() && jobList}
           </div>
        </div>
        </div>
      <div class="row">
      <div class="col-sm-4">
      <div class="card border-warning mb-3">
      <div class="card-body1">
        <h4 class="card-title">Locations</h4>
        <p class="card-text">Currently hosting in the following locations.</p>
        <ul>
          <li>Sydney </li> 
          <li>Melbourne </li>
          <li>Canberra </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card border-warning mb-3">
      <div class="card-body2">
        <h4 class="card-title">Services</h4>
        <p class="card-text"> The services we offer range from .</p>
        <ul>
          <li> Garderning </li> 
          <li> Plumbing </li>
          <li> Care-Taker </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card border-warning mb-3">
      <div class="card-body3">
        <h4 class="card-title">Coins </h4>
        <p class="card-text">Coins are exchanged for the services offered.</p>
        <p> 
          Offer services and collect coins. 
        </p>
      </div>
    </div>
  </div>
</div>
        </div>

    )
  }

}

export default HomePage;