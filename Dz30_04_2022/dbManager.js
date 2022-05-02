const fs = require('fs');

module.exports = class DBManager{
    constructor(dbPath)
    {
        this._dbPath = dbPath;   
        this._dbResource = null;      
    }

    openDatabase() {
        if(!this._dbResource)
            this._dbResource = JSON.parse(fs.readFileSync(this._dbPath).toString());
            
        return this._dbResource;
    }

    saveDatabase() {
        if(this._dbResource)
            fs.writeFileSync(this._dbPath, JSON.stringify(this._dbResource));
    }

    closeDatabase() {
        this._dbResource = null;
    }

    get(name) {
       return this._dbResource[name];
    }

    exists(name) {
        return name in this._dbResource;
    }
}