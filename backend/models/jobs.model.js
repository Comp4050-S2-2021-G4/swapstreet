const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    job_name :{ type: String, required: true},
    job_posted_date:{ type: Date, required: true},
    job_location:{ type: String, required: true},
    job_description:{ type: String, required: true},
    job_price:{ type: Number, required: true},    
}, {
    timestamp:true,
});

const job = mongoose.model('jobs', jobsSchema);
module.exports = job;