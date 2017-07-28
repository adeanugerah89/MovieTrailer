'use strict'
const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController')

/* GET users listing. */
router.get('/search/:movieSearch',controller.search);

module.exports = router;
