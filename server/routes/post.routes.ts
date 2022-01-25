import express from 'express';
import {CreatePost, DeletePost, UpdatePost, GetPostsByID, GetAllPosts} from '../controllers/post.controller'
import {checkUserAuth} from '../middleware/auth.middleware';
import {checkPostUser} from '../middleware/post-user.middleware';

const router = express.Router();
router.post('/api/post', checkUserAuth, CreatePost)
router.delete('/api/post/:id', checkUserAuth, checkPostUser, DeletePost)
router.put('/api/post/:id', checkUserAuth, checkPostUser, UpdatePost)

router.get('/api/post/:id', checkUserAuth, GetPostsByID)
router.get('/api/posts', checkUserAuth, GetAllPosts)



export = router;