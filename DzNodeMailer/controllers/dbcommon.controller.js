const { httpCodes } = require('../constants');

module.exports = {
    getDBContents: (model) => {
        return async (req, res) => {
            const { dbName, id } = req.params;
            const rows = await [model].find({});

            res.render('data', {
                title: dbName,
                rows: rows,
            });
        };
    },

    getById: (model) => {
        return async (req, res) => {
            const { dbName, id } = req.params;
            const result = await [model].find({ _id: id });
    
            res.status(httpCodes.OK).json(result);
        };
    },

    deleteById: (model) => {
        return async (req, res) => {
            const { dbName, id } = req.params;
            const user = await [model].deleteOne({ _id: id });
    
            res.status(httpCodes.OK).json(user);
        };
    },

    createNewRow: (model) => {
        return async (req, res) => {
            const user = await [model].create(req.body);
            res.status(httpCodes.CREATED).json(user);
        };
    },

    updateRow: (model) => {
        return async (req, res) => {
            const user = await [model].updateOne({ _id: id }, req.body);
            res.status(httpCodes.OK).json(user);
        };
    }
};