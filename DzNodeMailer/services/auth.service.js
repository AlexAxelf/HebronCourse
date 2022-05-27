const jwt = require('jsonwebtoken');

const conf = require('../config/config');
const tokenEnum = require('../constants/tokenTypes.enum');
const httpCodes = require('../constants/httpCodes.enum');
const ApiError = require('../error/apiError');
const { BAD_TOKEN } = require('../constants/authError.enum');

function genTokenPair(encodeData) {
    const accessToken = jwt.sign(encodeData,
        conf.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(encodeData,
        conf.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: '30m' }
    );

    return {
        accessToken,
        refreshToken
    };
}

function genActionToken(encodeData = {}) {
    return jwt.sign(encodeData, conf.ACTION_TOKEN_SECRET_KEY, { expiresIn: '24h' });
}

function checkToken(token, tokenType = tokenEnum.ACCESS) {
    try {
        let secretKey = conf.ACCESS_TOKEN_SECRET_KEY;

        if (tokenType === tokenEnum.REFRESH) {
            secretKey = conf.REFRESH_TOKEN_SECRET_KEY;
        }

        if (tokenType === tokenEnum.action.FORGOT_PASSWORD) {
            secretKey = conf.ACTION_TOKEN_SECRET_KEY;
        }

        return jwt.verify(token, secretKey);
    }
    catch(e)
    {
        throw new ApiError(e.message || BAD_TOKEN, httpCodes.UNAUTHORIZED);
    }
}

async function comparePasswords(hashedValue, value) {
    const valid = await bcrypt.compare(value, hashedValue);

    if(!valid)
        throw new ApiError('Wrong password', httpCodes.BAD_REQUEST);
}

function hash(value)
{
    return bcrypt.hash(value, 10);
}

module.exports = {
    genTokenPair,
    genActionToken,
    checkToken,
    comparePasswords,
    hash
};