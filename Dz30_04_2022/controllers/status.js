module.exports = {
    pageNotFound: function (req, res) {
        res.status(404).render('status', { title: '404 not found' });
    },

    idAlreadyPresent: function (req, res) {
        res.status(400).render('status', { title: 'Item with this id is already present' });
    }
}