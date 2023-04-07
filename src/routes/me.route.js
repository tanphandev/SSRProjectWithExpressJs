const express = require('express')
const meController = require('../controllers/me.controller')
const router = express.Router()

router.get('/course/stored', meController.stored)
router.get('/course/trash', meController.trash)

module.exports = router
