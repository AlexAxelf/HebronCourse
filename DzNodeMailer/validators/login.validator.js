const Joi = require('joi');

const{ regexEnum } = require('../constants');

const loginSchema = Joi.object({
    email    : Joi.string().email().lowercase().trim().required(),
    password : Joi.string().regex(regexEnum.PASSWORD_REGEX).required()
});

module.exports = {
    loginSchema
};