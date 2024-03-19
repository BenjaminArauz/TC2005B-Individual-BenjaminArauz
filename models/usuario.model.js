const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    save(){
        return bcrypt.hash(this.password, 12) 
            .then((password_cifrado) => { 
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

    static getPermisos(username){
        return db.execute(
            `SELECT Pr.Descripcion
            FROM usuario AS U, privilegio AS Pr, asigna AS A, posee AS P, rol AS R
            WHERE U.username = ? AND U.username = A.username AND A.idrol = R.IDRol AND R.IDRol = P.IDRol AND P.IDPrivilegio = Pr.IDPrivilegio
            `,
            [username]
        );
    }
};