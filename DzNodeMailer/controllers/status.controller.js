module.exports = {
    pageNotFound: (req, res) => {
        res.status(404).render('status', { title: '404 not found' });
    },

    httpErrorHandler: (err, req, res, next) => {
        const errCode = err.errorCode || 500;
        res.status(errCode).render('status', { title: `${errCode} ${err.message}`});
    }
};