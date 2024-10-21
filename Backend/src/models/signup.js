const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupSchema = new mongoose.Schema({
    name : {
      required : [true, 'Required field'],
      type: String
    },
    email : {
        required : [true , 'Required field'],
        type : String
    },
    password : {
        required :[ true , 'Required field'],
        type : String
    }
})

signupSchema.methods.getJWT = async function() {

    const user = this;

    const token = await jwt.sign({_id : user._id}, "Ajay@314", {expiresIn: "1h"});

    return token;
}
signupSchema.methods.validatePassword = async function (passwordInputByUser) {
     
    const user  = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
}

const signupModel = mongoose.model("signup",signupSchema);

module.exports = signupModel;