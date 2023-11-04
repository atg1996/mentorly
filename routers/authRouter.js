const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController')

router.post('/signup', controller.signUpUser);
router.post('/signin', controller.loginUser);

module.exports = router;
