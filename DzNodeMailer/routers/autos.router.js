const express = require('express');

const db      = require('../controllers/dbcommon.controller');
const dbMid   = require('../middleware/dbCommon.middleware');
const autoMid = require('../middleware/auto.middleware');
const models  = require('../models');

const app = express.Router();

const idExists = dbMid.passIfIdExists(models.auto);
const idDoesNotExist = dbMid.passIfIdDoesNotExist(models.auto);

app.get('/', idExists, db.getDBContents(models.auto));
app.get('/:id', idExists, db.getById(models.auto));

app.post('/create/',  idDoesNotExist, autoMid.checkCreation, db.createNewRow(models.auto));

app.patch('/update/:id',  idExists, autoMid.checkCreation, db.updateRow(models.auto));

module.exports = app;