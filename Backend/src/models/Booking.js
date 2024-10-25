const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    date: { type: Date, required: true   
   },
    time: { type: String, required: true },
    customerName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);

  module.exports = Booking;