module.exports = (request, response, next) => {
    let canCreate =  false;
    for (let permiso of request.session.permisos) {
        if (permiso.Descripcion == 'insertar_productos') {
            canCreate = true;
        }
    }
    if (canCreate) {
        next();
    } else {
        return response.redirect('/usuarios/logout');    
    }
}