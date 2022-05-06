const express = require('express');

const db               = require('../controllers/dataBase');
const dbMid = require('../middleware/database.middleware');
const userMid   = require('../middleware/users.middleware');

const app = express.Router();

app.get('/create/:dbName',     dbMid.dbExists, db.rowCreator);
app.get('/update/:dbName/:id', dbMid.dbExists, dbMid.checkId, db.updater);
app.get('/delete/:dbName/:id', dbMid.dbExists, dbMid.checkId, db.deleteById);
app.get('/:dbName',            dbMid.dbExists, db.getDBContents);
app.get('/:dbName/:id',        dbMid.dbExists, dbMid.checkId, db.getById);

app.post('/create/users',      userMid.checkAge, userMid.emailExists, userMid.isGenderValid, db.createNewRow);
app.post('/create/autos',      db.createNewRow);
app.post('/update/autos/:id',  dbMid.checkId, db.updateRow);

module.exports = app;