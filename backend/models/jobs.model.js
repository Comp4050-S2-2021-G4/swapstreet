/* 
==========================================
 Title: Jobs Schema
 Author and Co-Authors: Jayakrithi Shivakumar 
 Last updated: 10 Oct 2021 12:07AM
==========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    _id : {type: String},
    jobID :{ type: Number},  
    userID:{ type: Number},  
    chosenUserID:{ type: Number},  
    jobStatus:{ type: Number},  
    rating:{ type: String}, 
    title:{ type: String},  
    description :{ type: String},  
    price:{ type: String},    
    location: {type:String},
},);

const job = mongoose.model('jobs', jobsSchema);
module.exports = job;