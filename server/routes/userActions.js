const express = require('express');
const usersController = require('../controllers/usersController')
const router = express.Router();
const {checkUser} = require('../middleware/authMiddileware')
// GET
router.get('/users', checkUser,  usersController.getUsers)

module.exports = router;