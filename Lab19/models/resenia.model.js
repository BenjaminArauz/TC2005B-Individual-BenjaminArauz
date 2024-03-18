const db = require('../util/database');

module.exports = class Resenia {
    constructor(nombre, texto){
        this.nombre = nombre;
        this.texto = texto;
    }

    save(){
        return db.execute(
            `INSERT INTO Resenia (nombre, texto)
            VALUES (?, ?)`,
            [this.nombre, this.texto]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM Resenia');
    }
}