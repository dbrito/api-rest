function Connection () {

    const mysql      = require('mysql');
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : 'root',
        database : 'estudo_api'
    });

    var connect = () => {
        return new Promise((resolve) => {
            connection.connect((err) => {
                if (err) reject(err);
                resolve(connection);
            })
        })
    }

    this.getConnection = async () => await connect();
}

module.exports = Connection;
