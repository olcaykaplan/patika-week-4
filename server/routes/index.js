const express = require('express')
const router = express.Router();

const authApi = require("./auth")
const userAcionsApi = require("./userActions")

router.use(authApi);
router.use(userAcionsApi);

module.exports = router;