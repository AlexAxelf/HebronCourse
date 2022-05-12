const joi = require('joi');

const userValidator = joi.object({
    name    : joi.string().alphanum().required().trim().min(1).max(100),
    email   : joi.string().email().required().trim().lowercase(),
    password: joi.string().alphanum().required().trim().min(1),
    age     : joi.number().min(18).max(100),
    gender  : joi.string().valid('male', 'female'),
});

module.exports = userValidator;