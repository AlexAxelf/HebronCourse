const serverPort = 3000;

const express = require('express');
const path = require('path');
const fs   = require('fs');

let dataBase = null;
const app = express();

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true }));

app.get('/', (request, response) =>{

    response.render('index');

});

app.post('/data', (req, res) => {
    const searchInStr = req.body.searchIn;
    const searchFor   = req.body.searchText;

    const searchIn = dataBase[searchInStr];

    if(!searchIn.length)
    {
        res.redirect('/');
        return;
    }

    const headers = Object.keys(searchIn[0]);

    const outputArray = Array();

    searchIn.forEach(function (item, index) {
        
        const values = Object.values(item);

        if(searchFor.length)
        {
            if(item['id'] == undefined || !item['id'].toString().includes(searchFor))
            {
                return;
            }
        }

        outputArray.push(values);
    });

    res.render('index', 
    { 
	    headerValues : headers,
        rows         : outputArray
    });
});

app.listen(serverPort, () => {
    dataBase = JSON.parse(fs.readFileSync('./database.json').toString());
    console.log('Server started');
});