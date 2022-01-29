import express from 'express'
import {checkUserAuth} from '../middleware/auth.middleware'
import {Users} from '../controllers/user.controller';
const router = express.Router();

router.get('/api/users', checkUserAuth, Users)

export = router;