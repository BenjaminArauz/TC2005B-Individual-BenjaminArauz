const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');


const productosController = require('../controllers/producto.controller');

router.get('/modificar/:producto_id', isAuth, productosController.get_modificar);

router.post('/modificar/:producto_id', isAuth, productosController.post_modificar);

router.get('/validar-contrasiena', isAuth, productosController.get_validar_contrasiena);

router.post('/validar-contrasiena', isAuth, productosController.post_validar_contrasiena);

router.get('/agregar', isAuth, productosController.get_agregar);

router.post('/agregar', isAuth, productosController.post_agregar);

router.get('/', isAuth, productosController.get_root);

module.exports = router;