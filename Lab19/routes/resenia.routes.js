const express = require('express');
const isAuth = require('../util/is-auth.js');
const router = express.Router();

const reseniasController = require('../controllers/resenia.controller');

router.get('/', isAuth, reseniasController.get_resenia);

router.post('/', reseniasController.post_resenia);

module.exports = router;