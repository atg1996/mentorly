const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')
const {tokenCheck} = require('../middlewares/auth')


router.get('/user/:id', (req, res) => {

});


router.get('/',tokenCheck, controller.getUsersWithPagination);

module.exports = router;
