/* 
==========================================
 Title: Jobs Schema
 Author and Co-Authors: Jayakrithi Shivakumar 
 Last updated: 10 Oct 2021 12:07AM
==========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// chosenUserID : Number 
const jobsSchema = new Schema({
    // todo remove as not required
  //  _id : {type:mongoose.Types.ObjectId},
    jobID :{ type: Number},  
    userID:{ type: String},
    chosenUserID:{ type: String},
    jobStatus:{ type: Number},  
    rating:{ type: String}, 
    title:{ type: String},  
    description :{ type: String},  
    price:{ type: Number},    // change made from string
    location: {type:String},
    firebaseUserId: {
        type: String,
        required: true
    }
    
},{versionKey : false}
);

const job = mongoose.model('jobs', jobsSchema);
module.exports = job;