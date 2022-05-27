const Joi = require('joi');
const { PASSWORD_REGEX } = require('../constants/regex.enum');

const passwordReset = Joi.object({
    token: Joi.string(),
    password: Joi.string().regex(PASSWORD_REGEX).required()
});

module.exports = {
    passwordReset
}