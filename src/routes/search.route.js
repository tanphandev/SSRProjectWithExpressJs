const express = require('express')
const searchController = require('../controllers/search.controller')
const router = express.Router()

router.get('/:id', searchController.show)

router.get('/', searchController.index)

module.exports = router
