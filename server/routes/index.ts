import express from 'express';

import authApi from "./auth.routes";
import userApi from "./user.routes";
import postApi from './post.routes';

const router = express.Router();

router.use(authApi);
router.use(userApi);
router.use(postApi);

export = router;