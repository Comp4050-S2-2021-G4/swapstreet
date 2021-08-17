// Simplifies routing : takes in name, email, password
const User = require('../models/users.model');

exports.register = async (req, res, next) => {
    const {name, email, password} = req.body;
    try{
        const user = await User.create({
            name, email, password
        });
        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        res.status(500).json({
            success : false,
            error: error.message,
        })
    }
};


exports.login = (req, res, next) => {
    res.send("Login Route");
};
/*
exports.forgotpassword = (req, res, next) => {
    res.send("forgotPassword Route");
};
exports.resetPassword = (req, res, next) => {
    res.send("resetpassword Route");
};
*/