/* 
==========================================
 Title: Route File
 Author and Co-Authors: Jayakrithi  
 Last updated: 10 Oct 2021 12:07AM
==========================================
*/
const router = require('express').Router();
const jobsCount = 0;
let Jobs = require('../models/jobs.model.js');
let MyUser = require('../models/users.model.js');

// Returns all users
router.route('/').get((req, res)=>{
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/count').get((req, res)=>{
    Jobs.count()
    .then(jobsCount = res.json(),
        jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/:_id').get((req, res)=>{
    Jobs.find({_id :req.params._id})
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});

// Used for Testing
// Return one user On Postman : Run it with URL
// http://localhost:3200/jobs/<ObjectID>

/*
router.route('/:_id').get((req, res)=>{
    Jobs.find({_id :req.params._id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
});
 */
/* 
Creates a new Job via Postman 
URL : http://localhost:3200/jobs/add
Fix needed : Needs to update JobID and other additional parameters 
as per the Jobs schema onto the Database.
*/
router.route('/add').post((req, res)=>{
    const job_title = req.body.title;
    const job_description = req.body.description;
    const job_price = req.body.price;
    const job_location = req.body.location;

    const newJob = new Jobs({
        jobID : 2,
        title : job_title,
        description: job_description,
        price : job_price ,
        location :job_location
    });
    newJob.save()
    .then(()=> res.json('new job added!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

// Used to Apply Jobs
// Only User Shrek can apply for Jobs
// Needs fixing (use of jwt to initialise chosenUserId)
/*
    Jobs.updateOne({jobID:req.params._id},{chosenUserID:req.params._pid},function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs.nModified);
        }
});
*/
router.route('/:_id/:_pid/:jobSt').post((req, res)=>{
    Jobs.updateOne({_id:req.params._id},{jobStatus:req.params.jobSt}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs);
    }
});
    Jobs.updateOne({_id:req.params._id},{chosenUserID:req.params._pid},function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ", docs.nModified);
    }
});
});

module.exports = router;