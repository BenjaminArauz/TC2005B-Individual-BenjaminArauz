const express = require('express');
const router = express.Router();

const reseniasController = require('../controllers/resenia.controller');

router.get('/', reseniasController.get_resenia);

router.post('/', reseniasController.post_resenia);

module.exports = router;