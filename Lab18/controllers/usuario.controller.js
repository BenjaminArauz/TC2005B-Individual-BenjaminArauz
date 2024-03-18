const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_signup = (request, response, next) => {
    const error ='';
    request.session.error = '';
    response.render('login', {
        nombreUsuario: '',
        usuariosLogin: false,
        csrfToken: request.csrfToken(),
        error: error,
    });
}

exports.post_signup = (request, response, next) => {
    request.session.username = request.body.nombreUsuario;
    const usuario = new Usuario(request.body.nombreUsuario, request.body.contraseniaUsuario);

    usuario.save()
    .then(([rows, fieldData]) => {
        response.redirect('/usuarios/login');
    }).catch((error) => {
        console.log(error);
    });
}

exports.get_login = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        nombreUsuario:  '',
        usuariosLogin: true,
        csrfToken: request.csrfToken(),
        error: error,
    });
};

exports.post_login = (request, response, next) => {
    Usuario.fetchOne(request.body.nombreUsuario)
        .then(([rows, fieldData]) => {
            if (rows.length == 1) {
                const usuario = rows[0];
                bcrypt.compare(request.body.contraseniaUsuario, usuario.password)
                    .then((doMatch) => {
                        if(doMatch) {
                            request.session.username = usuario.username;
                            request.session.isLoggedIn = true;
                            response.redirect('/');
                        } else {
                            request.session.error = 'Usuario o contraseña incorrectos';
                            response.redirect('/usuarios/login');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                request.session.error = 'Usuario o contraseña incorrectos';
                response.redirect('/usuarios/login');
            }
        })
        .catch((error) => {console.log(error);});
};

exports.get_logout = (request, response, next) => {
    
    Usuario.delete(request.session.username)
    .then(([rows, fieldData]) => {
        request.session.destroy(() => {
            response.redirect('/usuarios/login');
        });
    }).catch((error) => {
        console.log(error);
    });
}