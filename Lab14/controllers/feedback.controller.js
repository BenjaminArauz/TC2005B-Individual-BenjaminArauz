exports.get_ayuda = (request, response, next) => {
    response.render('ayuda', {
        nombreUsuario: request.session.username || '',
    });
}

exports.get_preguntas = (request, response, next) => {
    response.render('preguntas', {
        nombreUsuario: request.session.username || '',
    });
}