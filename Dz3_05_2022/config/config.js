const fs = require('fs');

const userModel = require('../database/user.model');
const autoModel = require('../database/auto.model');
const dbManager = require('../dbManager');

module.exports = {
    PORT : 3000,
    DBs : new dbManager({users: userModel, autos: autoModel}),
};