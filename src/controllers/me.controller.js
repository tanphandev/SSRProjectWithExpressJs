const courseModel = require('../models/Course')

class MeController {
    // [GET] me/course/stored
    stored(req, res, next) {
        let courseList = courseModel.find()
        if(req.query.hasOwnProperty('_sort'))
        {
            courseList = courseList.sort({
            [req.query.column]: req.query.type
           })
        }
        Promise.all([courseList.lean(),courseModel.countDeleted()])
        .then(([courses,countDeleted]) => {
            res.render('course/myCourse', { courses, countDeleted })
        })
        .catch(next)
    }
    // [GET] me/course/trash
    trash(req, res, next) {
        courseModel
            .findDeleted({})
            .lean()
            .then((courses) => {
                res.render('course/myTrash', { courses })
            })
            .catch(next)
    }
}

module.exports = new MeController()
