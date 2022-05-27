const Joi = require('joi');
const constants = require('../constants')

const passwordSchema = Joi.object({
  newPassword: Joi.string().regex(constants.regexEnum.PASSWORD_REGEX).required()
});

module.exports = {
  passwordSchema
};