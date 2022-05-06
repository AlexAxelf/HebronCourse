const express  = require('express');
const mongoose = require('mongoose');

const configs 	  = require('./config/config');
const routeRoot   = require('./routers/root');
const routeData   = require('./routers/data');
const cntrlStatus = require('./controllers/status');

const app = express();

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', routeRoot);
app.use('/data', routeData);
app.use(cntrlStatus.pageNotFound);

mongoose.connect('mongodb://localhost:27017/UsersNAutos').then(() => {
    console.log('Connected to mongoDB');
});

app.listen(configs.PORT, () => {
    console.log(`Server started at port ${configs.PORT}`);
});