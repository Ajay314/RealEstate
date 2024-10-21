const mongoose = require('mongoose');

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

const signupModel = mongoose.model("signup",signupSchema);

module.exports = signupModel;