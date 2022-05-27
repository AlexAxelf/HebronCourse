module.exports = {
    PORT : 3000,
    HOST : `http://localhost:${this.PORT}/`,
    MONGODB_SERVER : 'mongodb://localhost:27017/UsersNAutos',
    
    ACCESS_TOKEN_SECRET_KEY  : 'I am access token',
    REFRESH_TOKEN_SECRET_KEY : 'I am refresh token',
    ACTION_TOKEN_SECRET_KEY  : 'Action for serious bussiness',

    HOST_MAIL: process.env.HOST_MAIL,
    HOST_MAIL_PASSWORD: process.env.HOST_MAIL_PASSWORD
};