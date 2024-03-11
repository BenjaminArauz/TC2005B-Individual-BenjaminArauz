const db = require('../util/database');

module.exports = class Usuario {
    
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    save(){
        return db.execute(
            `INSERT INTO Usuario (username, password)
            VALUES (?, ?)`,
            [this.username, this.password]
        );
    }

    static delete(username){
        return db.execute(
            `DELETE FROM Usuario
            WHERE username = ?`,
            [username]
        );
    }

};