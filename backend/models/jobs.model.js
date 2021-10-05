const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    job_ID :{ type: Number, required: true},  
    user_ID:{ type: Number, required: true},  
    chosenUserID:{ type: Number, required: true},  
    job_status:{ type: String, required: true},  
    rating:{ type: Number, required: true}, 
    title:{ type: String, required: true},  
    description :{ type: String, required: true},  
    price:{ type: Number, required: true},    
}, {
    timestamp:true,
});

const job = mongoose.model('jobs', jobsSchema);
module.exports = job;