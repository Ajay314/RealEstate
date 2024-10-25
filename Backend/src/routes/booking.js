const express = require('express');
const Booking = require('../models/Booking')

const router = express.Router();


router.post('/booking', async (req, res) => {
    const { propertyId, date, time, customerName, contactInfo } = req.body;
  
    try {
      
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(400).json({ message: 'Invalid property ID' });
      }
  

      const isAvailable = property.availability.some(availableSlot =>
        availableSlot.date.getTime() === date.getTime() &&
        availableSlot.time === time
      );
      if (!isAvailable) {
        return res.status(400).json({ message: 'Selected date and time are not available' });
      }
  
 
      const booking = new Booking({
        propertyId,
        date,
        time,
        customerName,
        contactInfo,
      });
  
      await booking.save();
  
  
  
      res.json({ success: true }); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating booking' });
    }
  });
  

module.exports = router;