const express = require('express');

const db = require('../controllers/dataBase');

const app = express.Router();

app.get('/create/:dbName',     db.rowCreator);
app.get('/delete/:dbName/:id', db.deleteById);
app.get('/:dbName',            db.getDBContents);
app.get('/:dbName/:id',        db.getById);

app.post('/create/:dbName',     db.createNewRow);

module.exports = app;