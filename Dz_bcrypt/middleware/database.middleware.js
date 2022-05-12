const DBs         = require('../services/dbManager.service');
const cntrlStatus = require('../controllers/status.controller');

module.exports = {
    dbExists: (req, res, next) => {
        const { dbName } = req.params;

        if(!DBs.get(dbName)) {
            cntrlStatus.pageNotFound(req, res);
            return;
        }
        next();
    },
    
    checkId: async (req, res, next) => {
        const { dbName, id } = req.params;
        const db = DBs.get(dbName);

        try{

            if(!await db.find({_id: id})) {
                res.status(400).render('status', { title: 'Id not found'});
                return;
            }
            next();
        }
        catch(e)
        {
            res.status(400).render('status', { title: 'Bad id'});
        }
    }
}