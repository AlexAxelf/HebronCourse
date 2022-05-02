const configs = require('../config/config');
const dbUtils = require('../dbUtils');

const cntrlStatus = require('../controllers/status');
const { DBs }     = require('../config/config');

module.exports = {
    getDBContents: function (req, res) {
        const { dbName } = req.params;
        
        configs.DBs.openDatabase();

        if (!configs.DBs.exists(dbName)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs.get(dbName);
        res.render('data',
            {
                title: dbName,
                db: db,
                rows: dbUtils.getTableValues(db),
            });
        
        configs.DBs.closeDatabase();
    },

    getById: function (req, res) {
        const { dbName, id } = req.params;

        configs.DBs.openDatabase();

        if (!configs.DBs.exists(dbName)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs.get(dbName);
        res.render('data',
            {
                title: dbName,
                db: db,
                rows: Array.of(dbUtils.getRowIfEqual(db, 'id', id)),
            });

        configs.DBs.closeDatabase();
    },

    deleteById: function (req, res) {
        const { dbName, id } = req.params;

        configs.DBs.openDatabase();

        if (!configs.DBs.exists(dbName)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs.get(dbName);

        if(dbUtils.removeIfEqual(db, 'id', id))
            DBs.saveDatabase();

        configs.DBs.closeDatabase();
        
        res.redirect(`/data/${dbName}`);
    },

    rowCreator: function (req, res) {
        const { dbName, id } = req.params;

        configs.DBs.openDatabase();

        if (!configs.DBs.exists(dbName)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs.get(dbName);
        res.render('createNew',
            {
                title: dbName,
                db: db,
            });

        configs.DBs.closeDatabase();
    },

    createNewRow: function (req, res) {
        const { dbName } = req.params;
        const newEntry = req.body;

        configs.DBs.openDatabase();

        if (!configs.DBs.exists(dbName)) {
            cntrlStatus.pageNotFound(req, res);
            return;
        }
        const db = configs.DBs.get(dbName);

        if (dbUtils.getRowIfEqual(db, 'id', req.body.id)) {
            cntrlStatus.idAlreadyPresent(req, res);
            return;
        }

        db.rows.push(newEntry);
        configs.DBs.saveDatabase();
        configs.DBs.closeDatabase();

        res.redirect(`/data/${dbName}`);
    }
};