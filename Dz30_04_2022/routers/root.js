const express = require('express');

const db = require('../controllers/dataBase')
const configs = require('../config/config');

const app = express.Router();

app.get('/', (request, response) => {
    response.render('welcome', { 
        title : "Welcome",
        dbs    : configs.DBs
    });
});

module.exports = app;