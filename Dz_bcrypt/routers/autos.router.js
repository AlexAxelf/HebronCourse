const express = require('express');

const db      = require('../controllers/dbcommon.controller');
const dbMid   = require('../middleware/database.middleware');
const autoMid = require('../middleware/auto.middleware');

const app = express.Router();

app.post('/create/',     autoMid.checkInput, db.createNewRow);
app.post('/update/:id',  dbMid.checkId, autoMid.checkInput, db.updateRow);

module.exports = app;