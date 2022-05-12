const joi = require('joi');

const validators = require('../validators/index');
const HttpError  = require('../error/httpError');

module.exports = {
    checkInput: async (req, res, next) => {
        try {
            await joi.assert(req.body, validators.user);
            next();
        }
        catch(e)
        {
            next(new HttpError(e.details[0].message, 500));
        }
    },
}