module.exports = {
    pageNotFound: (req, res) => {
        res.status(404).render('status', { title: '404 not found' });
    },
}