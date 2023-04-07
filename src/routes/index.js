const searchRouter = require('./search.route')
const courseRouter = require('./course.route')
const meRouter = require('./me.route')
const siteRouter = require('./site.route')

function routes(app) {
    app.use('/search', searchRouter)
    app.use('/course', courseRouter)
    app.use('/me', meRouter)
    app.use('/', siteRouter)
}

module.exports = routes
