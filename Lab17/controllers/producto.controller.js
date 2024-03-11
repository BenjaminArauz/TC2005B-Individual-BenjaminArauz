const { request } = require('http');
const Producto = require('../models/producto.model');
const filesystem = require('fs');

exports.get_modificar = (request, response, next) => {
    Producto.fetch(request.params.producto_id).then(([rows, fieldData]) => {
        response.render('modificar', {
            nombreUsuario: request.session.username || '',
            producto: rows,
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

exports.post_modificar = (request, response, next) => {
    Producto.fetch(request.params.producto_id).then(([rows, fieldData]) => {
        let producto = new Producto(0, request.body.nombre_producto, request.body.precio_producto, request.body.descripcion_producto, request.body.imagen_producto)
        producto.update(rows);
        response.redirect('/')
    })
    .catch((error) => {
        console.log(error);
    });
}

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
    producto.save()
    .then(([rows, fieldData]) => {
        response.setHeader('Set-Cookie', 'ultimo_producto=' + producto.nombre + '; HttpOnly');
        response.redirect('/');
    }).catch((error) => {
        console.log(error);
    });

    //Agregar productos a un txt
    Producto.fetchAll().then(([rows, fieldData]) => {
        
        filesystem.writeFileSync('Lab17/productos.txt', '');
        for (let i = 0; i < rows.length; i++) {
            filesystem.appendFileSync('Lab17/productos.txt', rows[i].nombre  + "\n" + rows[i].precio + "\n" + rows[i].texto + "\n" + rows[i].url+ "\n\n");
        }
    })
    .catch((error) => {
        console.log(error);
    });;
}

exports.get_root = (request, response, next) => {

    Producto.fetch(request.params.producto_id).then(([rows, fieldData]) => {
        response.render('home', {
            productos: rows,
            ultimo_producto: request.cookies.ultimo_producto || '',
            nombreUsuario: request.session.username || ''
        });
    })
    .catch((error) => {
        console.log(error);
    });
}