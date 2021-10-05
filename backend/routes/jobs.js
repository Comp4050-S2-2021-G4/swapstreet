const router = require('express').Router();
let Jobs = require('../models/jobs.model.js');

router.route('/').get((req, res)=>{
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/job').get((req, res)=>{
    Jobs.findOne({job_ID: req.job_ID})
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));

});

module.exports = router;