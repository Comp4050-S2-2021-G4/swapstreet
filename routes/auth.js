// authorization router
// register will be routed to http://localhost:5000/api/register 
const express = require('express');
const router = express.Router();

const {register, login} = require('../controllers/auth');
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;