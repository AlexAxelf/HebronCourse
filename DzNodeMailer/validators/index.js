module.exports = {
    auto: require('./auto.validator'),
    user: require('./user.validator'),
    query: require('./query.validator'),
    email: require('./email.validator'),
    password: require('./password.validator'),
    passwordReset : require('./passReset.validator'),
    login: require('./login.validator'),
    userUpdate : require('./userUpdate.validator'),
    autoUpdate : require('./autoUpdate.validator'),
}