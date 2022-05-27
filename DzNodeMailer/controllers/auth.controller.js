const { httpCodes } = require('../constants');
const httpHeaders = require('../constants/httpHeaders.enum');
const { oauth } = require('../models');
const userModel = require('../models/user.model');
const authService = require('../services/auth.service');
const actionTokenModel = require('../models/actionToken.model');
const tokenTypes = require('../constants/tokenTypes.enum');
const emailService = require('../services/email.services');
const { HOST } = require('../config/config');
const emailTypeEnum = require('../constants/emailType.enum');

module.exports = {
    login: async (req, res, next) => {
        try{
            const { user, body: { password }} = req;

            await authService.comparePasswords(user.password, password);
            
            const tokPair = authService.genTokenPair({ userId: user._id });

            await oauth.create({ user_id: user._id, ...tokPair});
            res.json(user, ...tokens);
        }
        catch(e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try { 
            const authUser = req.authUser;
            await OAuth.deleteMany({ _user_id: authUser._id });

            res.status(httpCodes.OK).json('You have logged out');
        }
        catch(e) {
            next(e);
        }    
    },

    refresh: async (req, res, next) => {
        try {
            const refreshToken = req.get(httpHeaders.AUTH);
            const authUser     = req.authUser;

            await oauth.deleteOne({ refreshToken });

            const tokens = authService.genTokenPair({ userId : authUser._id});

            await oauth.create({user_id: authUser._id, ...tokens});

            res.json(authUser, ...tokens);
        }
        catch(e) {
            next(e);
        }
    },

    forgetPassword: async (req, res, next) => {
        try {
            const { user } = req;

            const token = authService.genActionToken({ userId: user._id });

            await actionTokenModel.create({
                user_id: user._id,
                token,
                actionType: tokenTypes.action.FORGOT_PASSWORD
            });

            const passResetLink = `${HOST}/password/forgot?token=${token}`;

            await emailService.send(
                user.email, 
                emailTypeEnum.FORGOT_PASSWORD, 
                {
                    passResetLink,
                    userName: user.name
                }  
            );

            res.json('Reset link has been sent');
        }
        catch(e)
        {
            next(e);
        }
    },

    setNewPassword: async (req, res, next) => {
        try {
            const { body, user } = req;

            const hashedPass = await authService.hash(body.password);

            await userModel.updateOne({_id: user._id}, { password: hashedPass});
            await oauth.deleteMany({user_id: user._id});
            await actionTokenModel.deleteMany({user_id: user._id});

            res.json('Password has been changed');
        }
        catch(e)
        {
            next(e);
        }
    }
}