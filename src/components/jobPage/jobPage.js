import React, { Component} from '../../../node_modules/react';
import './jobPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import { isAuthenticated } from "../../auth/index";
import chat from '../../chat/chat';
import {  Link } from "react-router-dom";
const axios = require('axios').default;

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userID: this.props.userID,
        job: this.props.location.state.job,
        name: this.props.name,
        jobID:'', 
        chosenUserID: this.props.chosenUserID,  
        jobStatus: this.props.jobStatus,  
        rating: this.props.rating, 
        title: '',  
        description : '',  
        price: '',    
        location: '',
        seller :'',
        chosenUserDetails : '',
        firebaseUser: this.props.firebaseUser
    }
      console.log('props:', props);
      console.log('jobPage:', this.state.job);
  }

applyForJob(event) {
    event.preventDefault();
    var job = this.state.job
    job.jobStatus = 2;
    job.chosenUserID = this.state.userID.$oid;
    var jobID = this.state.job._id;
    var chosenUserID = this.state.userID.$oid;
    var jobStatus = 2;

    const appliedJob = {
        jobStatus :2,
        chosenUserID: this.state.userID.$oid.toString()
    }
    this.setState({
        jobStatus :2,
        chosenUserID: this.state.userID.$oid
    })
    // http://localhost:3200/jobs/6115056cc99805fb912b84b2/616038d25e3ee61591968a4c
    axios.post(` http://localhost:3200/jobs/${jobID}/${chosenUserID}/${jobStatus}`,appliedJob)
    .then( res => console.log(res.data()))
    .then((data)=> {
        this.setState({
            job: data
        })
})
}

acceptChosenUser(event) {
    event.preventDefault();
    //this.updateVariables();

    event.preventDefault();
    var job = this.state.job
    job.jobStatus = 3;

    var jobID = this.state.job._id;
    var chosenUserID = this.state.job.chosenUserID;
    var jobStatus = 3;        
    const acceptJob = {
        jobStatus :3,
    }
    this.setState({
        jobStatus :3,
    })
    // http://localhost:3200/jobs/6115056cc99805fb912b84b2/616038d25e3ee61591968a4c
    axios.post(` http://localhost:3200/jobs/${jobID}/${chosenUserID}/${jobStatus}`,acceptJob)
    .then( res => console.log(res.data()))
    .then((data)=> {
        this.setState({
            job: data
        })
})
}

declineChosenUser(event) {
    event.preventDefault();
    //this.updateVariables();
    var job = this.state.job
    job.jobStatus = 1;
    var jobID = this.state.job._id;
    var chosenUserID = this.state.job.chosenUserID;
    var jobStatus = 1;
    console.log("ACCEPT CHOSEN USER EVENT ",jobID);
    console.log("users Id = ",chosenUserID);        
    const declineJob = {
        jobStatus :1,
        chosenUserID: ""
    }
    this.setState({
        jobStatus :1,
        chosenUserID: ""
    })
    // http://localhost:3200/jobs/6115056cc99805fb912b84b2/616038d25e3ee61591968a4c
    axios.post(` http://localhost:3200/jobs/${jobID}/${this.state.job.chosenUserID}/${jobStatus}`,declineJob)
    .then( res => console.log(res.data()))
    .then((data)=> {
        this.setState({
            job: data
        })
})
}

markAsCompleted(event) {
    event.preventDefault();
    //this.updateVariables();
    //http://localhost:3200/rating?rating=true&userID=5f728f406d252648c48c303e&chosenUserID=5f728f406d252648c48c303e&jobID=5f728f406d252648c48c303e&rating=-1
    var job = this.state.job
    job.jobStatus = 4;
    job.chosenUserID = this.state.userID.$oid;
    var jobID = this.state.job._id;
    var chosenUserID = this.state.userID.$oid;
    var jobStatus = 4;
    console.log("ACCEPT CHOSEN USER EVENT ",jobID);
    console.log("users Id = ",chosenUserID);        
    const completedJob = {
        jobStatus :4,
        chosenUserID: this.state.userID.$oid
    }
    this.setState({
        jobStatus :4,
        chosenUserID: this.state.userID.$oid
    })
    // http://localhost:3200/jobs/6115056cc99805fb912b84b2/616038d25e3ee61591968a4c
    axios.post(` http://localhost:3200/jobs/${jobID}/${chosenUserID}/${jobStatus}`,completedJob)
    .then( res => console.log(res.data()))
    .then((data)=> {
        this.setState({
            job: data
        })
})
}

    componentDidMount() {
        console.log("Here I am ")
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

        fetch('http://localhost:3200/jobs/' + this.state.job._id)
        .then( resp => resp.json())
        .then((data)=> {
            this.setState({seller : data})
         //   console.log("Hello there I am back ", userID)
        }).catch((error) => console.log(error))
    
        fetch('http://localhost:3200/users/' + this.state.job.userID)
        .then( resp => resp.json())
        .then((data)=> {
            this.setState({seller : data[0]})
            console.log("Hello there I am back state userID", data)
        }).catch((error) => console.log(error))
        
        fetch('http://localhost:3200/users/' + this.state.job.chosenUserID)
        .then( resp => resp.json())
        .then((data)=> {
            this.setState({chosenUserDetails : data[0]})
     //       console.log("Hello there I am back ", this.state.chosenUserDetails)
        }).catch((error) => console.log(error))
    }

    async chatToJobPoster(event) {
        event.preventDefault()
        const userId = this.state.firebaseUser.user.uid;
        const name = this.state.name
        const jobPosterId = this.state.job.firebaseUserId;
        const posterName = this.state.job.posterName;
        const doesConversationExist = await chat.doesChatConversationExist(userId, jobPosterId);
        console.log(`jobPage#chatToJobPoster:198`, doesConversationExist);
        let messageId
        if (doesConversationExist.length) {
            messageId = doesConversationExist[0].id
        } else {
            const newConvo = await chat.createChatConversation({ userId, name }, { jobPosterId, posterName })
            messageId = newConvo.conversationId
        }
        window.location.href = "messages/" + messageId
    }

  /* 
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="userCoinsIcon" fill="#17a2b8" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z"/>
</svg>
  */
  //  && job.userID === this.state.userID && this.state.chosenName !== null
  render() {
      const job = this.props.location.state.job
      const isJobPoster = this.state.userID.$oid === job.userID
      return (
            <div className="container">
                    <link rel="icon" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img className="jobImage card-img-top"
                                 alt={''}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="descriptionContainer">
                                    <div>
                                        <h3 className="card-title">
                                            {job.title}
                                        </h3>
                                        <div className = "card border-warning mb-2">
                                        <div className = "jobcard">
                                        <h5 className="card-subtitle mb-2 text-muted">
                                        <p className="card-header"> Job Location</p>
                                        </h5>
                                        <h6>
                                             <i className="glyphicon glyphicon-map-marker"/> {job.location}
                                        </h6>
                                        <br/>
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
                                        <br/>
                                        <h5 className="card-subtitle mb-2 text-muted">      
                                        <p className="card-header"> Job Status</p>     
                                        </h5>  
                                        <h6>
                                        <p className="card-text">
                                            {(job.jobStatus === 1 && "Listed Job") || (job.jobStatus === 2 && "Applied") ||
                                            (job.jobStatus === 3 && "Active") || (job.jobStatus === 4 && "Completed")
                                            }
                                        </p>
                                        </h6> 
                                        <div className="sellerDetails">
                                             <h5 className="card-subtitle mb-2 text-muted">      
                                              <p className="card-header"> Seller Details</p>     
                                             </h5>  
                                            <h6 className="card-text">{"Listing by: "+ this.state.seller.name}</h6> <br/>
                                            <h5 className="card-subtitle mb-2 text-muted">      
                                              <p className="card-header"> Ratings</p> </h5>
                                            <div className="ratingContainer">
                                                <svg width="20px" height="20px" viewBox="0 0 16 16" className="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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


                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                    <Link to={this.props.location.state.prevLocation}>
                        <button className="btn btn-danger btn-lg active">
                            Go Back
                        </button>
                    </Link>

                    {(job.userID === this.state.userID) && (job.jobStatus !== 3) && (job.jobStatus !== 4) || <Link to={{pathname: "/edit", state: {job: job}}}>
                        <button className="btn btn-primary btn-lg active">
                            Edit
                        </button>
                    </Link>}
                    
                    {job.jobStatus === 1 && isAuthenticated() && job.userID !== this.state.userID && <Link onClick={e => {this.applyForJob(e)}}>
                        <button className="btn btn-primary btn-lg active">
                            Apply for Job
                        </button>
                    </Link>}

                    {job.jobStatus === 3 && job.userID === this.state.userID || <Link onClick={e => {this.markAsCompleted(e)}}>
                        <button className="btn btn-success btn-lg active">
                            Completed
                        </button>
                    </Link>}

                    {job.firebaseUserId !== this.state.firebaseUser.user.uid && <Link onClick={e => this.chatToJobPoster(e)}>
                        <button className="btn btn-lg btn-outline-success">Chat</button>
                    </Link>}
                </div>
                
                
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                
                {job.jobStatus === 2 && isJobPoster === true &&
                <div className="card border-dark mb-3 dash-card">
                        <div className="card-body text-dark dash-card-body">
                            <h5 className="card-title">{this.state.chosenUserDetails.name} Has Applied for this Job</h5>
                            <p className="card-text">Email: {this.state.chosenUserDetails.email}</p>
                            <p className="card-text">Rating: {this.state.chosenUserDetails.rating}</p>
                            <img className="chosenImage card-img-top" src={this.state.chosenPicture}  alt={''}/>
                        </div>
                        <div className="card-footer bg-transparent border-dark">

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