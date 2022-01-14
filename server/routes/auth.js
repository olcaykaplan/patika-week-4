const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();
const {checkUser} = require('../middleware/authMiddileware')
// GET
router.get('/user-auth', checkUser, (req, res) => {
    res.status(200).send({error:false, user:res.locals.fullName})
})
router.get('/logout', authController.logout)
// POST
router.post('/signup', authController.createUser)
router.post('/signin', authController.login)
module.exports = router;