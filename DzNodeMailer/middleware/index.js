module.exports = {
    auth : require('./auth.middleware'),
    auth : require('./auto.middleware'),
    dbCommon : require('./dbCommon.middleware'),
    query    : require('./query.middleware'),
    user     : require('./user.middleware')
};