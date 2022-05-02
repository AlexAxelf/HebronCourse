const fs = require('fs');

module.exports = {
    PORT : 3000,
    DBs : JSON.parse(fs.readFileSync('./database.json').toString())
}