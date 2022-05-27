const joi = require('joi');

const validators = require('../validators/index');
const ApiError  = require('../error/apiError');
const { httpCodes } = require('../constants');
const userError = require('../constants/userError.enum');
const userModel = require('../models/user.model');

module.exports = {
    checkCreation: (req, res, next) => {
        try {
            joi.assert(req.body, validators.user);
            next();
        }
        catch(e)
        {
            next(new ApiError(e.details[0].message, httpCodes.BAD_REQUEST));
        }
    },
    
    checkUpdate: (req, res, next) => {
        try {
            joi.assert(req.body, validators.userUpdate);
            next();
        }
        catch(e)
        {
            next(new ApiError(e.details[0].message, httpCodes.BAD_REQUEST));
        }
    }, 

    getDynamicallyUser: (paramName = '_id', where = 'body', DBField = paramName) => {
        return async (req, res, next) => {
          try {
            const reqElement = req[where];
      
            if (!reqElement || typeof reqElement !== 'object') {
                throw new ApiError('Incorrect search param');
            }
      
            const param = reqElement[paramName];
      
            const user = await userModel.findOne({ [DBField]: param }).select("+password");
      
            if (!user) {
                throw new ApiError(userError.NOT_FOUND, httpCodes.NOT_FOUND);
            }
      
            req.user = user;
      
            next()
          } catch (e) {
            next(e);
          }
        }
    }
}