const router = require('express').Router();
let Jobs = require('../models/jobs.model.js');

router.route('/').get((req, res)=>{
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)=>{
    const job_id = req.body.job_id;
    const job_userID = req.body.job_userID;
    const job_chosenUserID = 0;
    const job_rating = 0;
    const job_description = req.body.job_description;
    const job_price = req.body.job_price;
    const job_location = req.body.job_location;

    const newJob = new Jobs({
        job_id,
        job_userID,
        job_chosenUserID,
        job_rating,
        job_description,
        job_price ,
        job_location
    });

    newJob.save()
    .then(()=> res.json('new job added!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;