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

// Returns all users
router.route('/').get((req, res)=>{
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});

/* Used for Testing
// Return one user On Postman : Run it with URL
// http://localhost:3200/jobs/7  {where 7 is the ID}
router.route('/:jobID').get((req, res)=>{
    Jobs.find({jobID :req.params.jobID})
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
router.route('/add').post((req, res)=>{
    const job_title = req.body.title;
    const job_description = req.body.description;
    const job_price = req.body.price;
    const job_location = req.body.location;

    const newJob = new Jobs({
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

router.route('/:jobID').post((req, res)=>{
   if (typeof window !== 'undefined') {
        myData  = localStorage.getItem('jwt');
        console.log('we are running on the client')
    } else {
        console.log('we are running on the server');
    }
    Jobs.findOneAndUpdate({jobID:req.params.jobID},{chosenUserId:8},{jobStatus:2}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }
});
});

module.exports = router;