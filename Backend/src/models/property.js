const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },

    price: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Property', propertySchema);