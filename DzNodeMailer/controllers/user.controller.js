const bcrypt = require('bcrypt');

const ApiError = require('../error/apiError');
const userModel = require('../models/user.model');

module.exports = {
    createNewUser: async (req, res, next) => {
        try {
            const db = userModel;
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
        const db = userModel;

        const obj = Object.assign({}, req.body);
        obj.password = await bcrypt.hash(obj.password, 10);

        await db.updateOne({_id : id}, obj);

        res.redirect('/data/user');
    }
}