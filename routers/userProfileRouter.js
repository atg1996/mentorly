const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController')
const {tokenCheck} = require('../middlewares/auth')


router.patch('/edit', tokenCheck, controller.editPersonalInfo );

module.exports = router;
