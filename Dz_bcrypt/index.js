const express  = require('express');
const mongoose = require('mongoose');

const configs 	  = require('./config/config');
const routes      = require('./routers/index');
const cntrlStatus = require('./controllers/status.controller');
const DBs         = require('./services/dbManager.service')
const models      = require('./models/index');

const app = express();

DBs.add(models.user);
DBs.add(models.auto);

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes.root);
app.use('/data/user', routes.user);
app.use('/data/auto', routes.auto);
app.use('/data', routes.common);
app.use('*', cntrlStatus.pageNotFound);

app.use(cntrlStatus.httpErrorHandler);

mongoose.connect('mongodb://localhost:27017/UsersNAutos').then(() => {
    console.log('Connected to mongoDB');
});

app.listen(configs.PORT, () => {
    console.log(`Server started at port ${configs.PORT}`);
});