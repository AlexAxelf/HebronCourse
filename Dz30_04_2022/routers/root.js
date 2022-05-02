const express = require('express');

const db 	  = require('../controllers/dataBase');
const configs = require('../config/config');
const dbMan   = require('../dbManager');

const app = express.Router();

app.get('/', (request, response) => {
    response.render('welcome', { 
        title : "Welcome",
        dbs    : configs.DBs.openDatabase(),
    });

    configs.DBs.closeDatabase();
});

module.exports = app;