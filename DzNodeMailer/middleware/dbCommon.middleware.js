const { httpCodes } = require("../constants");
const ApiError = require("../error/apiError");

module.exports = {
    passIfIdExists: (model) => {
        return (req, res, next) => {
            const { id } = req.body;
            
            if(![model].findOne({_id : id}))
            {
                next(new ApiError('Id does not exist', httpCodes.BAD_REQUEST));
                return;
            }
            next();
        }
    },

    passIfIdDoesNotExist: (model) => {
        return (req, res, next) => {
            const { id } = req.body;
            
            if([model].findOne({_id : id}))
            {
                next(new ApiError('Id already exists', httpCodes.BAD_REQUEST));
                return;
            }
            next();
        }
    },

};