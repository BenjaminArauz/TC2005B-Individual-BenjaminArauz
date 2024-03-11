const Producto = require('../models/producto.model');

exports.get_validar_contrasiena = (request, response, next) => {
    response.render('validador', {
        nombreUsuario: request.session.username || '',
    });
}

exports.post_validar_contrasiena = (request, response, next) => {
    if (request.body.password === request.body.confirm_password) {
        response.redirect('/');
    } else {
        response.redirect('/validar-contrasiena');
    }
}

exports.get_agregar = (request, response, next) => {
    response.render('agregar', {
        nombreUsuario: request.session.username || '',
    });
}

exports.post_agregar = (request, response, next) => {
    let producto = new Producto(0, request.body.nombre_producto, request.body.precio_producto, request.body.descripcion_producto, request.body.imagen_producto);
    
    //Agregar producto creado a los productos
    producto.save();
    response.setHeader('Set-Cookie', 'ultimo_producto=' + producto.nombre + '; HttpOnly'); //HttpOnly: No se puede acceder a la cookie desde el cliente

    //Agregar productos a un txt
    Producto.crear_txt();
    response.redirect('/');
}

exports.get_root = (request, response, next) => {
    console.log(request.cookies);
    console.log(request.cookies.ultimo_producto);
    response.render('home', {
        productos: Producto.fetchAll(),
        ultimo_producto: request.cookies.ultimo_producto || '',
        nombreUsuario: request.session.username || '',
    });
}