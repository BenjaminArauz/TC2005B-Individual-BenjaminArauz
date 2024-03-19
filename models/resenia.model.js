let resenia = [];

module.exports = class Resenia {
    constructor(nombre, texto){
        this.nombre = nombre;
        this.texto = texto;
    }

    save(){
        resenia.push(this);
    }

    static fetchAll() {
        return resenia;
    }
}