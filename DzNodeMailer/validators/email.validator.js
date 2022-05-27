const Joi = require('joi');

const email = Joi.object({
    email: Joi.string().email().required().trim().lowercase()
});

module.exports = {
    email
};