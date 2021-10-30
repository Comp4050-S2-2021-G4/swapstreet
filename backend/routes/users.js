const router = require('express').Router();
let Users = require('../models/users.model.js');

router.route('/').get((req, res)=>{
    Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

// Finds user by ObjectID
router.route('/:_id').get((req, res)=>{
    console.log("YOLOLOL")
    Users.find({_id :req.params._id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;