const express  = require('express');

const dbCommon = require('../controllers/dbcommon.controller');
const dbMid    = require('../middleware/database.middleware');

const app = express.Router();

app.get('/:dbName/create',     dbCommon.rowCreator);
app.get('/:dbName/update/:id', dbMid.dbExists, dbMid.checkId, dbCommon.updater);
app.get('/:dbName/delete/:id', dbMid.dbExists, dbMid.checkId, dbCommon.deleteById);
app.get('/:dbName',            dbMid.dbExists, dbCommon.getDBContents);
app.get('/:dbName/:id',        dbMid.dbExists, dbMid.checkId, dbCommon.getById);

module.exports = app;