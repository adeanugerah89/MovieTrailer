var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');

router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);

module.exports = router;
