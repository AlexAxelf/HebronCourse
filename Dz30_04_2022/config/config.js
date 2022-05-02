const fs = require('fs');

const dbManager = require('../dbManager');

module.exports = {
    PORT : 3000,
    DBs : new dbManager('./database.json'),
};