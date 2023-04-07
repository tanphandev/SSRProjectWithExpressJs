class SearchController {
    // [GET]: search
    index(req, res) {
        res.render('search')
    }
    show(req, res) {
        res.send('detail...')
    }
}

module.exports = new SearchController()
