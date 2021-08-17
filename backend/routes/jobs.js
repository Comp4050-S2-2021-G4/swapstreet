const router = require('express').Router();
let Jobs = require('../models/jobs.model.js');

router.route('/').get((req, res)=>{
    jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)=>{
    const job_name = req.body.job_name;
    const job_posted_date = req.body.job_posted_date;
    const job_location = req.body.job_location;
    const job_description = req.body.job_description;
    const job_price = req.body.job_price;

    const newJob = new Jobs({
        job_name,
        job_posted_date,
        job_location,
        job_description,
        job_price,
    });

    newJob.save()
    .then(()=> res.json('new job added!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;