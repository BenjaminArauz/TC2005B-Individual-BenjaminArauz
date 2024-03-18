const express = require('express');
const isAuth = require('../util/is-auth');
const canCreate = require('../util/canCreate');
const router = express.Router();

const productosController = require('../controllers/producto.controller');

router.get('/modificar/:producto_id', isAuth, productosController.get_modificar);

router.post('/modificar/:producto_id', isAuth, productosController.post_modificar);

router.get('/validar-contrasiena', isAuth, productosController.get_validar_contrasiena);

router.post('/validar-contrasiena', isAuth, productosController.post_validar_contrasiena);

router.get('/agregar', isAuth, canCreate, productosController.get_agregar);

router.post('/agregar', isAuth, canCreate, productosController.post_agregar);

router.get('/', isAuth, productosController.get_root);

module.exports = router;