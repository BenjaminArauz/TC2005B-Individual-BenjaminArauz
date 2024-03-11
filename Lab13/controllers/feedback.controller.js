exports.get_ayuda = (request, response, next) => {
    response.render('ayuda');
}

exports.get_preguntas = (request, response, next) => {
    response.render('preguntas');
}