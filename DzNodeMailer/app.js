const express  = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const configs 	  = require('./config/config');
const routes      = require('./routers');
const cntrlStatus = require('./controllers/status.controller');
const { MONGODB_SERVER } = require('./config/config');

const app = express();

dotenv.config();

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes.root);
app.use('/data/user', routes.user);
app.use('/data/auto', routes.auto);
app.use('auth', routes.auth);
app.use('*', cntrlStatus.pageNotFound);

app.use(cntrlStatus.httpErrorHandler);

mongoose.connect(MONGODB_SERVER).then(() => {
    console.log('Connected to mongoDB');
});

app.listen(configs.PORT, () => {
    console.log(`Server started at port ${configs.PORT}`);
});