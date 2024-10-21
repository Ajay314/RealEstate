const jwt = require('jsonwebtoken');
const Signup = require("../models/signup");

const userAuth = async (req,res,next) =>{
    
    try{
    
    const cookies = req.cookies;

    const {token} = cookies;
    if(!token){
        throw new Error("Token not Valid");
    }

    const decodedObj = await jwt.verify(token,"Ajay@314");

    const { _id } = decodedObj;

  const user = await Signup.findById(_id);
  if(!user){
    throw new Error("User not Found");
  }
  
req.user=user;
  next();
}
catch (err){
    res.status(400).send("ERROR:" + err.message);

}
}

module.exports = { userAuth } ;