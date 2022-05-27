const express = require('express');
const { dbCommon } = require('../controllers');

const cntrl   = require('../controllers');
const { query } = require('../middleware');
const dbMid = require('../middleware/dbCommon.middleware');
const userMid = require('../middleware/user.middleware');
const models = require('../models');
const userModel = require('../models/user.model');

const app = express.Router();
const idExists = dbMid.passIfIdExists(models.user);

app.get('/', query.checkQuery, dbCommon.getDBContents(userModel));
app.get('/:id', idExists, dbCommon.getById(userModel));

app.post('/create', userMid.checkCreation, cntrl.user.createNewUser);

app.all('/:userId', userMid.getDynamicallyUser('userId', 'params', '_id'));
app.delete('/:id', dbCommon.deleteById(userModel))
app.patch('/:id',   userMid.checkUpdate, cntrl.user.update);

module.exports = app;