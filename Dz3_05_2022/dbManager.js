const fs = require('fs');

module.exports = class DBManager{
    constructor(collections)
    {
        this._collections = collections;  
    }

    get(name)
    {
        return this._collections[name];
    }

    getAllCollections()
    {
        return Object.keys(this._collections);
    }
}