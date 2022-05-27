const Joi = require('joi');
const { httpCodes } = require('../constants');
const ApiError = require('../error/apiError');

const queryValid = require('../validators/query.validator');

function checkQuery(req, res, next) {
    try {
        Joi.assert(req.query, queryValid);
        next();
    }
    catch(e)
    {
        next(new ApiError(e.message, httpCodes.BAD_REQUEST));
    }
}

module.exports = {
    checkQuery
};