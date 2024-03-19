const Resenia = require('../models/resenia.model');

exports.get_resenia = (request, response, next) => {
    Resenia.fetchAll().then(([rows, fieldData]) => {
        response.render('resenia', {
            resenias: rows,
            nombreUsuario: request.session.username || '',
        });
    })
    .catch((error) => {
        console.log(error);
    });
} 

exports.post_resenia = (request, response, next) => {
    const resenia = new Resenia(request.body.nombre_persona, request.body.resenia_texto);
    resenia.save().then(([rows, fieldData]) => {
        response.redirect('/resenia');
    })
    .catch((error) => {
        console.log(error);
    });
}