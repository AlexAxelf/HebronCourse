const joi = require('joi');

const userUpdateValidator = joi.object({
    name    : joi.string().alphanum().trim().min(1).max(100),
    email   : joi.string().email().required().trim().lowercase(),
    age     : joi.number().min(18).max(100),
    gender  : joi.string().valid('male', 'female'),
});

module.exports = userUpdateValidator;