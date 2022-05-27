const Joi = require('joi');

const OAuth = require('../models/oauth.model');
const headers = require('../constants/httpHeaders.enum');
const authError = require('../constants/authError.enum')
const authService = require('../services/auth.service');
const validators = require('../validators');
const ApiError = require('../error/apiError');
const httpCodes = require('../constants/httpCodes.enum');
const tokenTypes = require('../constants/tokenTypes.enum');
const actionTokenModel = require('../models/actionToken.model');

async function checkAccessToken(req, res, next) {
    try {
        const accessToken = req.get(headers.AUTH);
        authService.checkToken(accessToken);

        const tokenEntry = await OAuth.findOne({ accessToken }).populate('user_id');

        if (!tokenEntry || !tokenEntry.user_id) {
            throw new ApiError(authError.BAD_TOKEN, httpCodes.BAD_REQUEST);
        }

        req.authUser = tokenDat.user_id;
        next();
    }
    catch (e) {
        next(e);
    }
}

async function checkRefreshToken(req, res, next) {
    try {
        const refreshToken = req.get(headers.AUTH);

        if (!refreshToken) {
            throw new ApiError(authError.NO_TOKEN_FOUND, httpCodes.BAD_REQUEST);
        }

        authService.checkToken(refreshToken, tokenTypes.REFRESH);

        const tokenEntry = await OAuth.findOne({ refreshToken }).populate('user_id');

        if (!tokenEntry || !tokenEntry.user_id) {
            throw new ApiError(authError.BAD_TOKEN, httpCodes.BAD_REQUEST);
        }

        req.authUser = tokenEntry.user_id;

        next();
    }
    catch (e) {
        next(e);
    }
}

function checkActionToken(actionTokenType) {
    return async function (req, res, next) {
        try {
            const { token } = req.body;

            if (!token) {
                throw new ApiError(authError.UNDEFINED, httpCodes.FORBIDDEN);
            }

            authService.checkToken(token, actionTokenType);

            const tokenInfo = await actionTokenModel.findOne(
                { token, actionTokenType })
                .populate('user_id');

            req.user = tokenInfo.user_id;
        }
        catch (e) {
            next(e);
        }
    }
}

function checkLogin(req, res, next) {
    try {
        Joi.assert(req.body, validators.login.loginSchema);
        req.body = value;
        next();
    }
    catch (e) {
        next(new ApiError(e.details[0].message, httpCodes.BAD_REQUEST));
    }
}

function checkPassword(req, res, next) {
    try {
        Joi.assert(req.body, validators.password.passwordSchema);
        next();
    } catch (e) {
        next(new ApiError(e.details[0].message, httpCodes.BAD_REQUEST));
    }
}

function checkReset(req, res, next) {
    try {
        Joi.assert(req.body, validators.passwordReset.passwordReset);
    }
    catch (e) {
        next(new ApiError(e.details[0].message, httpCodes.BAD_REQUEST));
    }
}

function checkEmail(req, res, next) {
    try {
        Joi.assert(req.body, validators.email.email);
        next();
    }
    catch (e) {
        next(new ApiError(e.details[0].message, httpCodes.BAD_REQUEST));
    }
}

module.exports = {
    checkAccessToken,
    checkRefreshToken,
    checkActionToken,
    checkLogin,
    checkPassword,
    checkReset,
    checkEmail,
}

