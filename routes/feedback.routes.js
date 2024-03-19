const express = require('express');
const router = express.Router();

const feedbackController = require('../controllers/feedback.controller');

router.get('/ayuda', feedbackController.get_ayuda);

router.get('/preguntas', feedbackController.get_preguntas);

module.exports = router;