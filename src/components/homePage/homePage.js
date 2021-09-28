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
    const array1 = [1]
    let hpage = array1.map(_ => {
      return (
        <div className = "homepage-elements">
        <Jumbotron>
        <div className= "about">   
        <div className = "animate-slide-1">
        <br> 
        </br>
        <h1> Welcome to SwapStreet </h1>
        <h5> Platform to bring community together</h5>
        </div>
        <br> 
        </br>
        <br> 
        </br>
        <div className = "animate-slide-2">
          <h5> We help connect you closer to your neighbourhood </h5>
          <h5> Join our community now! </h5>
         </div> 
         <br></br>
         <div className = "button-register">
         <a class="btn btn-warning" href="/register" role="button" style = {{left: "100px"}}>Become a Swapstreet Member</a>
        </div>
        </div>
        </Jumbotron>
              <div class="row">
              <div class="col-sm-3">
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
          <div class="col-sm-3">
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
          <div class="col-sm-3">
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
          <div class="col-sm-3">
            <div class="card border-warning mb-3">
              <div class="card-body2">
                <h4 class="card-title">Join Our Community</h4>
                <p class="card-text"> Register now! .</p>
              </div>
            </div>
          </div>
        </div>
        </div>  
      );
    })

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
    /* 
    Search bar 
            <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
            id="Search"
            onChange={this.searchData}
          />
        </form>


        <div className = "search-bar"> 
        <form class="form-inline d-flex justify-content-center md-form form-sm">
        <i class="fas fa-search" aria-hidden="true"></i>
          <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search">
            </input>
        </form>   
        </div>
    */
    return (
      <div className="homePage">
        {!isAuthenticated() && hpage}
        <div className="homeContainer">
          <div className="row">
            {isAuthenticated() && jobList}
           </div>
        </div>
</div>

    )
  }

}

export default HomePage;