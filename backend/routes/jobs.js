/* 
==========================================
 Title: Route File
 Author and Co-Authors: Jayakrithi Shivakumar 
 Last updated: 10 Oct 2021 12:07AM
==========================================
*/
const router = require('express').Router();
let Jobs = require('../models/jobs.model.js');
let MyUser = require('../models/users.model.js');

// Returns all jobs

// Used for Testing
// Return one user On Postman : Run it with URL
// http://localhost:3200/jobs/<ObjectID>

/*
router.route('/').get((req, res)=>{
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});
 */
/* 
Creates a new Job via Postman 
URL : http://localhost:3200/jobs/add
Fix needed : Needs to update JobID and other additional parameters 
as per the Jobs schema onto the Database.
*/
router.route('/add').post((req, res) => {
    const job_id = req.body.job_id;
    const job_userID = req.body.userID;
    const job_chosenUserID = 0;
    const job_rating = 0;
    const job_title = req.body.title
    const job_description = req.body.description;
    const job_price = req.body.price;
    const job_location = req.body.location;

    console.log(`jobs#post.add:52`, req.body.firebaseUserId);
    if (!req.body.firebaseUserId) {
        res.status(401).json({ error: 'firebaseUserId not found' });
    }

    const newJob = new Jobs({
        jobID: 0,
        userID: job_userID,
        chosenUserID: "",
        jobStatus: 1,
        rating: 5,
        title: job_title,
        description: job_description,
        price: job_price,
        location: job_location,
        firebaseUserId: req.body.firebaseUserId
    });
    console.log("newJob ", newJob)
    newJob.save()
        .then(() => res.json('new job added!!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
    Jobs.find()
        .then(jobs => res.json(jobs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:_id').get((req, res)=>{
    Jobs.find({_id :req.params._id})
    .then(user => res.json(user))
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
router.route('/:_id/:_pid/:jobSt').post((req, res) => {
    Jobs.updateOne({ _id: req.params._id }, { jobStatus: req.params.jobSt }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Updated Docs : ", docs);
        }
    });
    Jobs.updateOne({ _id: req.params._id }, { chosenUserID: req.params._pid }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Updated Docs : ", docs.nModified);
        }
    });
});

module.exports = router;