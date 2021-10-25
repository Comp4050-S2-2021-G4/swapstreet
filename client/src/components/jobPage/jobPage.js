import React, { Component} from '../../../node_modules/react';
import './jobPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import { isAuthenticated } from "../../auth/index";
import jobDataFill from '../dataFill/dataFillPage';
import {  Link } from "react-router-dom";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userID: this.props.userID,
        job: this.props.location.state.job
    }
  }

applyForJob(event) {
    event.preventDefault();
    var job = this.state.job
    job.jobStatus = 2;
    job.chosenUserID = this.state.userID;
    //Needs Fixing
    let url = new URL("http://localhost:3200/jobs/1")

    url.searchParams.set("replaceID", job._id)
    url.searchParams.set("jobID", job.jobID)
    url.searchParams.set("userID", job.userID)
    url.searchParams.set("jobStatus", 2)
    url.searchParams.set("chosenUserID", job.chosenUserID)
    url.searchParams.set("title", job.title)
    url.searchParams.set("description", job.desc)
    url.searchParams.set("price", job.price)
    url.searchParams.set("location", job.location)
    //this.updateVariables();
    // Needs Fixing
    fetch(url.href).then(() =>
    {
        console.log("Inside applyJob hello ", job.jobID)
        fetch('http://localhost:3200/jobs/'+ 1)
        .then( resp => resp.json())
        .then((data)=> {
                this.setState({
                    job: data
                })
        })
        .catch((error) => console.log(error))
    }
)

}

acceptChosenUser(event) {
    event.preventDefault();
    //this.updateVariables();

    var job = this.state.job
    job.jobStatus = 3;

    let url = new URL("http://localhost:3200/jobs?replace=true")

    url.searchParams.set("replaceID", job._id)
    url.searchParams.set("userID", job.userID)
    url.searchParams.set("jobStatus", 3)
    url.searchParams.set("chosenUserID", job.chosenUserID)
    url.searchParams.set("title", job.title)
    url.searchParams.set("description", job.desc)
    url.searchParams.set("price", job.price)
    url.searchParams.set("location", job.location)

    fetch(url.href).then(() =>
    {
        fetch('http://localhost:3200/jobs?fetch=true&_id=' + job._id)
        .then( resp => resp.json())
        .then((data)=> {
                this.setState({
                    job: data
                })
        })
        .catch((error) => console.log(error))
    }
)
}

declineChosenUser(event) {
    event.preventDefault();
    //this.updateVariables();

    var job = this.state.job
    job.jobStatus = 1;
    job.chosenUserID = " ";

    let url = new URL("http://localhost:3200/jobs?replace=true")

    url.searchParams.set("replaceID", job._id)
    url.searchParams.set("userID", job.userID)
    url.searchParams.set("jobStatus", 1)
    url.searchParams.set("chosenUserID", job.chosenUserID)
    url.searchParams.set("title", job.title)
    url.searchParams.set("description", job.desc)
    url.searchParams.set("price", job.price)
    url.searchParams.set("location", job.location)

    fetch(url.href).then(() =>
    {
        fetch('http://localhost:3200/jobs?fetch=true&_id=' + job._id)
        .then( resp => resp.json())
        .then((data)=> {
                this.setState({
                    job: data
                })
        })
        .catch((error) => console.log(error))
    }
)
}

markAsCompleted(event) {
    event.preventDefault();
    //this.updateVariables();
    //http://localhost:3200/rating?rating=true&userID=5f728f406d252648c48c303e&chosenUserID=5f728f406d252648c48c303e&jobID=5f728f406d252648c48c303e&rating=-1

    var job = this.state.job
    job.jobStatus = 4;

    let url = new URL("http://localhost:3200/jobs?replace=true")

    url.searchParams.set("replaceID", job._id)
    url.searchParams.set("userID", job.userID)
    url.searchParams.set("jobStatus", 4)
    url.searchParams.set("chosenUserID", job.chosenUserID)
    url.searchParams.set("title", job.title)
    url.searchParams.set("description", job.desc)
    url.searchParams.set("price", job.price)
    url.searchParams.set("location", job.location)

    fetch(url.href).then(() =>
    {
        fetch('http://localhost:3200/jobs?fetch=true&_id=' + job._id)
        .then( resp => resp.json())
        .then((data)=> {
                this.setState({
                    job: data
                })

                url = new URL("http://localhost:3200/rating?add=true")

                url.searchParams.set("userID", job.userID)
                url.searchParams.set("chosenUserID", job.chosenUserID)
                url.searchParams.set("jobID", job._id)
                url.searchParams.set("rating", 1)
            
                fetch(url.href).then(() =>
                {
                    fetch('http://localhost:3200/jobs?fetch=true&_id=' + job._id)
                    .then( resp => resp.json())
                    .then((data)=> {
                            this.setState({
                                job: data
                            })
                    })
                })
                .catch((error) => console.log(error))
        })
    })
}

    componentDidMount() {
        fetch('http://localhost:3200/users?fetch=true&_id=' + this.props.location.state.job.userID)
            .then( resp => resp.json())
            .then((data)=> {
                this.setState({name : data[0].name})
        }).catch((error) => console.log(error))

        fetch('http://localhost:3200/rating?total=true&chosenUserID=' + this.props.location.state.job.userID)
        .then( resp => resp.json())
        .then((data)=> {
            this.setState({rating : data.total})
        }).catch((error) => console.log(error))

        fetch('http://localhost:3200/users?fetch=true&_id=' + this.props.location.state.job.chosenUserID)
        .then( resp => resp.json())
        .then((data)=> {
            this.setState({chosenName : data[0].name,
            chosenEmail: data[0].email,
            chosenPicture: data[0].picture})
        }).catch((error) => console.log(error))

        fetch('http://localhost:3200/rating?total=true&chosenUserID=' + this.props.location.state.job.chosenUserID)
        .then( resp => resp.json())
        .then((data)=> {
            this.setState({chosenRating : data.total})
        }).catch((error) => console.log(error))
    }


  /* 
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="userCoinsIcon" fill="#17a2b8" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z"/>
</svg>
  */
  
  render() {
      const job = this.props.location.state.job
      const seller = job.seller
      console.log("Job status print here ", job.jobStatus);
      return (
            <div className="container">
                    <link rel="icon" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <div className="card">
                    <div class="row no-gutters">
                        <div className="col-md-4">
                            <img className="jobImage card-img-top"
                                />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="descriptionContainer">
                                    <div>
                                        <h3 className="card-title">
                                            {job.title}
                                        </h3>
                                        <div class = "card border-warning mb-2">
                                        <div className = "jobcard">
                                        <h5 className="card-subtitle mb-2 text-muted">
                                        <p className="card-header"> Job Location</p>
                                        </h5>
                                        <h6>
                                             <i class="glyphicon glyphicon-map-marker"></i> {job.location}
                                        </h6>
                                        <br></br>
                                        <h5 className="card-subtitle mb-2 text-muted">
                                        <p className="card-header"> Job Price</p>
                                        </h5>
                                        <h6>
                                            Price: ${job.price}
                                        </h6>
                                        <h5 className="card-subtitle mb-2 text-muted">
                                        <p className="card-header"> Job Description</p>
                                        </h5> 
                                        <h6>
                                        {job.description}
                                        </h6>
                                        <br></br>
                                        <h5 className="card-subtitle mb-2 text-muted">      
                                        <p className="card-header"> Job Status</p>     
                                        </h5>  
                                        <h6>
                                        <p className="card-text">
                                            {job.jobStatus == 1 && "Listed Job" || job.jobStatus == 2 && "Applied" ||
                                            job.jobStatus == 3 && "Active" || job.jobStatus == 4 && "Completed"
                                            }
                                        </p>
                                        </h6> 
                                        <div className="sellerDetails">
                                             <h5 className="card-subtitle mb-2 text-muted">      
                                              <p className="card-header"> Seller Details</p>     
                                             </h5>  
                                            <h6 className="card-text">{"Listing by: "+ this.state.name}</h6> <br></br>
                                            <h5 className="card-subtitle mb-2 text-muted">      
                                              <p className="card-header"> Ratings</p> </h5>
                                            <div className="ratingContainer">
                                                <svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                                </svg>
                                                <h6 className="sellerRating text-muted"> {this.state.rating}</h6>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                    <Link to={this.props.location.state.prevLocation}>
                        <button className="btn btn-danger btn-lg active">
                            Go Back
                        </button>
                    </Link>

                    {job.userID === this.state.userID && job.jobStatus !== 3 && job.jobStatus !== 4 || <Link to={{pathname: "/edit", state: {job: job}}}>
                        <button className="btn btn-primary btn-lg active">
                            Edit
                        </button>
                    </Link>}
                    
                    {job.jobStatus === 1 && isAuthenticated() && job.userID !== this.state.userID || <Link onClick={e => {this.applyForJob(e)}}>
                        <button className="btn btn-primary btn-lg active">
                            Apply for Job
                        </button>
                    </Link>}

                    {job.jobStatus === 3 && job.userID === this.state.userID || <Link onClick={e => {this.markAsCompleted(e)}}>
                        <button className="btn btn-success btn-lg active">
                            Completed
                        </button>
                    </Link>}

                </div>
                
                
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">


                {job.jobStatus === 2 && job.userID === this.state.userID && this.state.chosenName !== null &&
                <div class="card border-dark mb-3 dash-card">
                        <div class="card-body text-dark dash-card-body">
                            <h5 class="card-title">{this.state.chosenName} Has Applied for this Job</h5>
                            <p class="card-text">Email: {this.state.chosenEmail}</p>
                            <p class="card-text">Rating: {this.state.chosenRating}</p>
                            <img className="chosenImage card-img-top" src={this.state.chosenPicture} />
                        </div>
                        <div class="card-footer bg-transparent border-dark">

                        <Link onClick={e => {this.acceptChosenUser(e)}}>
                            <button className="btn btn-success btn-lg active">
                                Accept
                            </button>
                        </Link>

                        <Link onClick={e => {this.declineChosenUser(e)}}>
                            <button className="btn btn-danger btn-lg active">
                                Decline
                            </button>
                        </Link>
                            
                        </div>
                    </div>
                }
                </div>
                </div>

                
        </div>  
    )}
}

export default Job;