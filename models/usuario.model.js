const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    save(){
        return bcrypt.hash(this.password, 12) //Obtiene el hash del password y lo cifra 12 veces
            .then((password_cifrado) => { //Devolver promesa con el password cifrado
                return db.execute(
                    `INSERT INTO usuario (username, password) 
                    VALUES (?, ?)`, 
                    [this.username, password_cifrado]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static delete(username){
        return db.execute(
            `DELETE FROM Usuario
            WHERE username = ?`,
            [username]
        );
    }

    static fetchOne(username) {
        return db.execute(
            `SELECT * FROM usuario 
            WHERE username = ?`, 
            [username]
        );
    }
};