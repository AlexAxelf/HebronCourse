const { title } = require('process');
const { DBs } = require('../config/config');

module.exports = {

    emailExists: async (req, res, next) => {
        const { email }  = req.body;
        
        const db = DBs.get('users');

        if(await db.find({email: email})) {
            res.status(409).render('status', { title: 'Email already present' });
            return;
        }

        next();
    },

    checkAge: async (req, res, next) => {
        const { age }  = req.body;
        
        const db = DBs.get('users');

        if(!isNaN(age) || age < 0) {
            res.status(400).render('status', { title: 'Invalid age value' });
            return;
        }

        next();
    },

    isGenderValid: async (req, res, next) => {
        const { gender }  = req.body;
        
        const db = DBs.get('users');

        if(gender.toLower() != 'male' || gender.toLower() != 'female') {
            res.status(400).render('status', { title: 'Invalid gender value' });
            return;
        }

        next();
    }

}