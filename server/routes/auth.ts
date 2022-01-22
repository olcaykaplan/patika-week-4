import express, {Request, Response} from 'express'
import * as authController from '../controllers/authController'
import {checkUser} from '../middleware/authMiddleware';
const router = express.Router();
// GET
router.get('/user-auth', checkUser, (req: Request, res: Response) => {
    res.status(200).send({error:false, user:res.locals.fullName})
})
router.get('/logout', authController.logout)
// POST
router.post('/signup', authController.createUser)
router.post('/signin', authController.login)
export  = router;