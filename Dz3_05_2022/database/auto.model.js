const { Schema, model } = require('mongoose');

const auto = new Schema({
    model : { type: String, trim: true, required: true },
    vendor: { type: String, trim: true, lowercase: true, required: true },
});

module.exports = model('Auto', auto);