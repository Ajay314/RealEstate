const express = require('express');

const propertyModel = require('../models/property');
const {authorizeAdmin } = require('../middleware/authAdmin');

const router = express.Router();


router.post('/add',authorizeAdmin, async (req, res) => {
    const { name, image, price, location, availability } = req.body;
  
    try {
      const newProperty = new propertyModel({ name, image, price, location, availability });
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.delete('/:name', authorizeAdmin,async (req, res) => {
    try {
      await propertyModel.findOneAndDelete({ name: req.params.name });
      res.json({ message: 'Property deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/:name',authorizeAdmin, async (req, res) => {
    try {
      const updatedProperty = await propertyModel.findOneAndUpdate({ name }, req.body, { new: true });;
      res.json(updatedProperty);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });












module.exports = router;