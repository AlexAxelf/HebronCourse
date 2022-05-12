class DBManager{
    constructor()
    {
        this._collections = new Map();
    }

    add(model)
    {
        this._collections.set(model.modelName, model);
    }

    get(name)
    {
        return this._collections.get(name);
    }

    getAllCollections()
    {
        return Array.from(this._collections.keys());
    }
}

const _instance = new DBManager();

module.exports = _instance;