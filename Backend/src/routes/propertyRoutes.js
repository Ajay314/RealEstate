const express = require('express');

const propertyModel = require('../models/property');

const router = express.Router();


router.post('/add', async (req, res) => {
    const { name, image, price, location, availability } = req.body;
  
    try {
      const newProperty = new propertyModel({ name, image, price, location, availability });
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });












module.exports = router;