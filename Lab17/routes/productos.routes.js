const express = require('express');
const router = express.Router();

const productosController = require('../controllers/producto.controller');

router.get('/modificar/:producto_id', productosController.get_modificar);

router.post('/modificar/:producto_id', productosController.post_modificar);

router.get('/validar-contrasiena', productosController.get_validar_contrasiena);

router.post('/validar-contrasiena', productosController.post_validar_contrasiena);

router.get('/agregar', productosController.get_agregar);

router.post('/agregar', productosController.post_agregar);

router.get('/', productosController.get_root);

module.exports = router;