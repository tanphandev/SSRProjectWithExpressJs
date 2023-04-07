const CourseModel = require('../models/Course')
class SiteController {
    // [GET]: search
    async index(req, res, next) {
        CourseModel.find({})
            .lean()
            .then((courses) => {
                res.render('home', { courses })
            })
            .catch(next)
    }
}

module.exports = new SiteController()
