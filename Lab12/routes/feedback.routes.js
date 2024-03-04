const express = require('express');
const router = express.Router();

router.get('/ayuda', (request, response, next) => {
    response.render('ayuda');
});

router.get('/preguntas', (request, response, next) => {
    response.render('preguntas');
});

module.exports = router;