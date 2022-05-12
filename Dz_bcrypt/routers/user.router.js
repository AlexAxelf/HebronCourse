const express = require('express');

const dbMid   = require('../middleware/database.middleware');
const cntrl   = require('../controllers/index')
const userMid = require('../middleware/user.middleware');

const app = express.Router();

app.get('/login/', cntrl.user.loginGet);

app.post('/login/', cntrl.user.loginPost);
app.post('/create', userMid.checkInput, cntrl.user.createNewUser);
app.post('/update/:id', dbMid.checkId, userMid.checkInput, cntrl.user.update);

module.exports = app;