const express = require('express');
const { validateSignUpData } = require('../utils/validation');

const Signup = require('../models/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post("/signup", async (req, res) => {

    try {
        validateSignUpData(req);
        const { name, email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new Signup({
            name,
            email,
            password: passwordHash
        });
        await user.save();
        res.send("User added");
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await Signup.findOne({ email: email });
        if (!user) {
            throw new Error("User Not Found");
        }

        const isPasswordValid = await Signup.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Password is not Correct");
        }
        else {

            const token = await user.getJWT();
            res.cookie("token", token);
            res.send("Login Sucess");
        }
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

module.exports = router;