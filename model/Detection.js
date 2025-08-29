const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
    text: {type: String, required: true},
    result: {type: String, required: true},
    confidence: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Detection',detectionSchema);