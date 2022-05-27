const joi = require('joi');

const validators = require('../validators/index');
const ApiError  = require('../error/apiError');

module.exports = {
    checkCreation: async (req, res, next) => {
        try {
            joi.assert(req.body, validators.auto);
            next();
        }
        catch(e)
        {
            next(new ApiError(e.details[0].message, 500));
        }
    },
}