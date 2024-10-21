const mongoose = require('mongoose');

const connectDB =  async () =>{

 await mongoose.connect("mongodb+srv://ajay:ajay314@realestate.e36qu.mongodb.net/RealEstate");
   
}

module.exports = connectDB;





