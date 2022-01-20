import express from 'express'
const router = express.Router();

import authApi from "./auth"
import userActionsApi from "./userActions"

router.use(authApi);
router.use(userActionsApi);

export = router;