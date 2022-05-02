const configs = require('../config/config');
const dbUtils = require('../dbUtils');

const cntrlStatus = require('../controllers/status');

module.exports = {
    getDBContents: function (req, res) {
        const { dbName } = req.params;

        if (!(dbName in configs.DBs)) {

            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs[dbName];
        res.render('data',
            {
                title: dbName,
                db: db,
                rows: dbUtils.getTableValues(db)
            });
    },

    getById: function (req, res) {
        const { dbName, id } = req.params;

        if (!(dbName in configs.DBs)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs[dbName];
        res.render('data',
            {
                title: dbName,
                db: db,
                rows: Array.of(dbUtils.getRowIfEqual(db, 'id', id))
            });
    },

    deleteById: function (req, res) {
        const { dbName, id } = req.params;

        if (!(dbName in configs.DBs)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs[dbName];

        dbUtils.removeIfEqual(db, 'id', id);

        res.redirect(`/data/${dbName}`);
    },

    rowCreator: function (req, res) {
        const { dbName, id } = req.params;

        if (!(dbName in configs.DBs)) {
            cntrlStatus.pageNotFound(res, res);
            return;
        }
        const db = configs.DBs[dbName];
        res.render('createNew',
            {
                title: dbName,
                db: db
            });
    },

    createNewRow: function (req, res) {
        const { dbName } = req.params;
        const newEntry = req.body;

        if (!(dbName in configs.DBs)) {
            cntrlStatus.pageNotFound(req, res);
            return;
        }
        const db = configs.DBs[dbName];

        if (dbUtils.getRowIfEqual(db, 'id', req.body.id)) {
            cntrlStatus.idAlreadyPresent(req, res);
            return;
        }

        db.rows.push(newEntry);
        res.redirect(`/data/${dbName}`);
    }
};