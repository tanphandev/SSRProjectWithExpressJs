const express = require('express')
const courseController = require('../controllers/course.controller')
const router = express.Router()

// go to create course page
router.get('/create', courseController.create)
// store a course into database
router.post('/store', courseController.store)
// find a course to update
router.get('/:id/update', courseController.findOneCourse)
// restore course
router.patch('/:id/restore', courseController.restore)
// go to course detail page
router.get('/:slug', courseController.show)
// handle form when submit
router.post('/handle-form-submit',courseController.handleFormSubmit)
// update a course
router.put('/:id', courseController.update)
// force delete a course
router.delete('/:id/force', courseController.forceDelete)
// soft delete a course
router.delete('/:id', courseController.softDelete)

module.exports = router
