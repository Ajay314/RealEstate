const validator = require('validator');

const validateSignUpData = (req) => {
    const { name, email , password } = req.body;
    if (!name) {
        throw new Error("Nameis not valid");
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not valid");
    }
};


module.exports = { validateSignUpData };
