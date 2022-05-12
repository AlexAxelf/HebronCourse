const joi = require('joi');

const autoValidator = joi.object({
    model    : joi.string().required().trim(),
    vendor   : joi.string().required().trim(),
});

module.exports = autoValidator;