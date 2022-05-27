const Joi = require('joi');

const querySchema = Joi.object({
  limit: Joi.number().min(0),
  page: Joi.number().min(1)
})

module.exports = {
    querySchema
};