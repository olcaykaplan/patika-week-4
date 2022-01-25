import express from 'express'
import {checkUserAuth} from '../middleware/auth.middleware'
import {Users} from '../controllers/user.controller';
const router = express.Router();

router.get('/api/users', checkUserAuth, Users)
  // return all posts of the user
  // const userPosts = await repository.find({relations: ['user'], where: {user: {id:userId}}})

export = router;