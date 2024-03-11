const db = require('../util/database');

module.exports = class Producto {
    constructor(cantidad, nombre, precio, descripcion, url){
        this.cantidad = cantidad;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.url = url;
    }

    save(){
        return db.execute(
            `INSERT INTO Producto (nombre, precio, descripcion, url)
            VALUES (?, ?, ?, ?)`, 
            [this.nombre, this.precio, this.descripcion, this.url]
        );
    }

    update(rows) {
        return db.execute(
            `UPDATE Producto 
            SET nombre = ?, precio = ?, descripcion = ?, url = ? 
            WHERE IDProducto = ?`,
            [this.nombre, this.precio, this.descripcion, this.url, rows[0].IDProducto]
        )
    }

    static fetchAll() {
        return db.execute('SELECT * FROM Producto');
    }

    static fetch(IDProducto) {
        if (IDProducto) {
            return this.fetchOne(IDProducto);
        } else {
            return this.fetchAll();
        }
    }
    static fetchOne(IDProducto) {
        return db.execute('SELECT * FROM producto WHERE IDProducto = ?', [IDProducto]);
    }
}