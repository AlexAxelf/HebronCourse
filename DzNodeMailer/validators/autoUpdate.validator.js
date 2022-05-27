const joi = require('joi');

const autoValidator = joi.object({
    model    : joi.string().trim(),
    vendor   : joi.string().trim(),
});

module.exports = autoValidator;