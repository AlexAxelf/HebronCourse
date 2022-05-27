const { Router } = require('express');
const authMid = require('../middleware/auth.middleware');
const userMid = require('../middleware/user.middleware');
const authController = require('../controllers/auth.controller');
const tokenTypes = require('../constants/tokenTypes.enum');

const app = Router();

app.post('/login',
    authMid.checkLogin,
    userMid.getDynamicallyUser('email'),
    authController.login
);

app.post('/logout', authMid.checkAccessToken, authController.logout);

app.post('/refresh', authMid.checkRefreshToken, authController.refresh);

app.post(
    '/password',
    authMid.checkEmail,
    userMid.getDynamicallyUser('email')
);

app.post(
    '/password/forgot',
    authMid.checkEmail,
    userMid.getDynamicallyUser('email')
);

app.patch(
    '/password/forgot',
    authMid.checkEmail,
    userMid.getDynamicallyUser('email'),
    authController.forgetPassword
);

app.patch(
    '/password/reset',
    authMid.checkReset,
    authMid.checkActionToken(tokenTypes.action.FORGOT_PASSWORD),
    authController.setNewPassword
);



module.exports = app;