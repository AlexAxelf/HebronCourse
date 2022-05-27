const express = require('express');

const app = express.Router();

app.get('/', (request, response) => {
    response.render('welcome', { 
        title : "Welcome",
    });
});

module.exports = app;