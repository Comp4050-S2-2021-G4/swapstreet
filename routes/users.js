const router = require('express').Router();
let Users = require('../models/users.model.js');

router.route('/').get((req, res)=>{
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;