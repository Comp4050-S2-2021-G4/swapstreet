// Users
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    _id : {type:String},
    name : {type : String,required: true },
    email: {type: String,required: true,unique : true},
    address:{type:String, required:true},
    password:{type:String, required:true, select: false},
    jobs:{type:Array, required:true},
    rating:{type:Number},
    role:{type:String},
    Coins:{type:Number},
    userId:{type:Number}    
});

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

const User = mongoose.model("User", userSchema);
module.exports = User;