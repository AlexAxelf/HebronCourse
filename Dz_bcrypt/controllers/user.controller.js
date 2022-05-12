const bcrypt = require('bcrypt');

const HTTPError = require('../error/httpError');
const DBs       = require('../services/dbManager.service');

module.exports = {
    loginGet: (req, res) => {
        res.render('login');
    },

    loginPost: async (req, res, next) => {
        const { email, password } = req.body;
        const db = DBs.get('user');

        const user = await db.findOne({email : email});

        if(!user)
            next(new HTTPError('Failed to login', 401));

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid) {
            next(new HTTPError('Failed to login', 401));
            return;
        }

        res.render('status', { title : 'Login successful!'});
    },

    createNewUser: async (req, res, next) => {
        try {
            const db = DBs.get('user');
            const obj = Object.assign({}, req.body);
            obj.password = await bcrypt.hash(obj.password, 10);

            await db.create(obj);

            res.redirect(`/data/user`);
        }
        catch(exc)
        {
            next(exc);
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const db = DBs.get('user');

        const obj = Object.assign({}, req.body);
        obj.password = await bcrypt.hash(obj.password, 10);

        await db.updateOne({_id : id}, obj);

        res.redirect('/data/user');
    }
}