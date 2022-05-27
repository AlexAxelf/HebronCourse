const { Schema, model } = require('mongoose');

const OAuth = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'users'
    },
    access_token : { type: String, required: true },
    refresh_Token: { type: String, required: true }
}, { timestamps: true });

module.exports = model('oauth', OAuth);