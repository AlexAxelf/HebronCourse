const { Schema, model } = require('mongoose');

const user = new Schema({
    name : { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    age:   { type: Number, default: 18 },
    gender:{ type: String, default: 'male' }
});

module.exports = model('User', user);