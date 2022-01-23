import express from 'express'
import * as usersController from '../controllers/usersController'
import {checkUser} from '../middleware/authMiddleware'
const router = express.Router();
// GET
router.get('/users', checkUser,  usersController.getUsers)

export = router;