const express = require('express');
const { validateSignUpData } = require('../utils/validation');

const Signup = require('../models/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post("/signup", async (req,res) =>{

    try {
        validateSignUpData(req);
        const { name , email, password } = req.body;
       const passwordHash = await bcrypt.hash(password,10);
   
        const user = new Signup({
           name,
           email,  
           password:passwordHash
        });
        await user.save();
        res.send("User added");
      }
      catch (err) {
       res.status(400).send("ERROR:" + err.message);
      }
})

module.exports = router;