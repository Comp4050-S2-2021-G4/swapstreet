// Users
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique : true,
    },
    password:{
        type:String,
        required:[true, "Please provide a password"],
        minlength: 4,
        select: false
    }
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