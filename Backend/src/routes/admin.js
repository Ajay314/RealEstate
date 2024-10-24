const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

router.post("/signup/admin", async (req, res) => {

    try {
        
        const { username, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new Admin({
            username,
            password: passwordHash
        });
        await user.save();
        res.send("Admin added");
    }
    catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

router.post('/login/admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin._id, isAdmin: true }, "Ajay@314");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;