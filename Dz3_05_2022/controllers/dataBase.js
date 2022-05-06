const configs = require('../config/config');
const dbUtils = require('../dbUtils');

const cntrlStatus = require('../controllers/status');
const { DBs }     = require('../config/config');

module.exports = {
    getDBContents: async (req, res) => {
        const { dbName } = req.params;

        const db = configs.DBs.get(dbName);
        const rows = await db.find({});

        res.render('data', {
                title: dbName,
                rows: rows,
            });
    },

    getById: async (req, res) => {
        const { dbName, id } = req.params;
        
        const db     = configs.DBs.get(dbName);
        const result = await db.find({_id : id});
        
        res.render('data', {
                title: dbName,
                rows: result,
            });
    },

    deleteById: async (req, res) => {
        const { dbName, id } = req.params;

        const db = configs.DBs.get(dbName);
        await db.deleteOne({_id : id});

        res.redirect(`/data/${dbName}`);
    },

    rowCreator: async (req, res) => {
        const { dbName, id } = req.params;

        const db = configs.DBs.get(dbName);
        const columns = Object.keys(db.schema.paths).filter((path) => !path.startsWith('_'));

        res.render('createNew', {
                title : dbName,
                columns : columns,
            });
    },

    updater: async (req, res) => {
        const { dbName, id } = req.params;

        const db = configs.DBs.get(dbName);
        const columns = Object.keys(db.schema.paths).filter((path) => !path.startsWith('_'));

        res.render('update', {
                title : dbName,
                columns : columns,
            });
    },

    createNewRow: async (req, res) => {
        const { dbName } = req.params;
        const db = configs.DBs.get(dbName);

        await db.create(req.body);

        res.redirect(`/data/${dbName}`);
    },

    updateRow: async (req, res) => {
        const { dbName, id } = req.params;
        const db = configs.DBs.get(dbName);

        await db.updateOne({_id : id}, req.body);

        res.redirect(`/data/${dbName}`);
    }
};