const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.post('/register', userController.createNewAccount)
router.post('/all', userController.getAllUsers)
module.exports = router
