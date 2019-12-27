const mongoose = require('mongoose');
const Car = mongoose.Schema({
    name: String,
    model: String,
    company: String,
    engine: String,
    type: String
});

module.exports = mongoose.model('cars', Car);
