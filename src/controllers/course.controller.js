const { Mongoose } = require('mongoose')
const CourseModel = require('../models/Course')

class CourseController {
    // [GET] course/:slug
    show(req, res, next) {
        CourseModel.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => res.render('course/courseDetail', course))
            .catch(next)
    }
    // [GET] courses/create
    create(req, res, next) {
        res.render('course/createCourse')
    }
    // [POST] course/store
    store(req, res, next) {
        const data = req.body
        data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const newCourse = new CourseModel(data)
        newCourse
            .save()
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => console.log('error:', err))
    }
    // [GET] course/:id/update
    findOneCourse(req, res, next) {
        CourseModel.findOne({ _id: req.params.id })
            .lean()
            .then((course) => {
                res.render('course/updateCourse', { course })
            })
            .catch(next)
    }

    // [PUT] course/:id
    update(req, res, next) {
        CourseModel.updateOne({ _id: req.params.id }, req.body)
            .lean()
            .then(() => {
                res.redirect('/me/course/stored')
            })
            .catch(next)
    }
    // [DELETE] course/:id
    softDelete(req, res, next) {
        CourseModel.delete({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [DELETE] course/:id/force
    forceDelete(req, res, next) {
        CourseModel.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [PATCH] course/:id/restore
    restore(req, res, next) {
        CourseModel.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    //[POST] course/handle-form-submit
    handleFormSubmit(req,res,next){
        console.log(req.body.courseIds);
        switch(req.body.action){
            case 'delete':
                CourseModel.delete({_id : {$in : req.body.courseIds}})
                .then(() => {
                    res.redirect('back')
                })
                .catch(next)
                return;
            default:
                res.json({error:"Action invalid"})
        }
    }
}

module.exports = new CourseController()
