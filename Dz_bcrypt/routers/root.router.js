const express = require('express');

const DBs = require('../services/dbManager.service');

const app = express.Router();

app.get('/', (request, response) => {
    response.render('welcome', { 
        title : "Welcome",
        dbs   : DBs.getAllCollections(),
    });
});

module.exports = app;