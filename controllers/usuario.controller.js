const Usuario = require('../models/usuario.model');

exports.get_login = (request, response, next) => {
    response.render('login', {
        nombreUsuario: request.session.username || '',
    });
};

exports.post_login = (request, response, next) => {
    request.session.username = request.body.nombreUsuario;
    const usuario = new Usuario(request.body.nombreUsuario, request.body.contraseniaUsuario);

    usuario.save()
    .then(([rows, fieldData]) => {
        response.redirect('/');
    }).catch((error) => {
        console.log(error);
    });
}

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