const router = require('express').Router();
let Users = require('../models/users.model.js');

router.route('/').get((req, res)=>{
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res)=>{
    const obj_id = req.body._id;
    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_address = req.body.address;
    const user_jobs = req.body.jobs;
    const user_rating = req.body.rating;
    const user_role = req.body.role;
    const user_balance = req.body.balance;
    const user_id = req.body.user_id;

    const newUser = new Users({
        obj_id,
        user_name,
        user_email,
        user_address,
        user_jobs,
        user_rating ,
        user_role,
        user_balance,
        user_id
    });

    newUser.save()
    .then(()=> res.json('new juser added!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;