const router = require('express').Router();
let Jobs = require('../models/jobs.model.js');
let MyUser = require('../models/users.model.js');

router.route('/').get((req, res)=>{
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));
});
// On Postman Run it with URL
// http://localhost:3200/jobs/7  {where 7 is the ID}
router.route('/:jobID').get((req, res)=>{
    Jobs.find({jobID :req.params.jobID})
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: '+ err));

});


module.exports = router;