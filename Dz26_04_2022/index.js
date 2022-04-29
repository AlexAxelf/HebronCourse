

const serverPort = 3000;

let express = require('express');
let path = require('path');
let fs   = require('fs');

let dataBase = null;
let app = express();

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true }));

app.get('/', (request, response) =>{

    response.render('index');

});

app.post('/data', (req, res) => {

    const searchInStr = req.body.searchIn;
    const fieldName   = req.body.fieldName;
    const searchFor   = req.body.searchText;

    let searchIn = dataBase[searchInStr];


    if(searchIn.length === 0)
    {
        res.redirect('/');
        return;
    }

    let headers = Object.keys(searchIn[0]);

    let outputArray = new Array();

    searchIn.forEach(function (item, index) {
        
        let values = Object.values(item);

        if(searchFor.length > 0)
        {
            if(item[fieldName] == undefined || !item[fieldName].toString().includes(searchFor))
            {
                return;
            }
        }

        outputArray.push(values);
    });

    res.render('index', 
    { headerValues : headers,
      rows         : outputArray
    });

});


app.listen(serverPort, () => {


    dataBase = JSON.parse(fs.readFileSync('./database.json').toString());

    console.log('Server started');

});