const { Schema, model } = require("mongoose");

const tokenTypes = require('../constants/tokenTypes.enum');

const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, trim: true, ref: 'user' },
    token: { type: String, required: true },
    action_type: { type: String, required: true, enum: Object.values(tokenTypes.action) }
}, { timestamps: true });

module.exports = model("action_token", schema);