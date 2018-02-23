function AutorDAO(conn) {
    const CONN = conn;
    const Autor = require('../models/Autor')

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM autor';
            CONN.query(sql, (error, results) => {
                if(error) return reject(error);

                var autors = [];
                results.forEach(function (row) {
                    let autor = new Autor(row.id, row.nome);
                    autors.push(autor);
                });

                resolve(autors);
            });
        });
    }

    this.getById = (id) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM autor WHERE id=?';
            CONN.query(sql, [id], (error, results) => {
                if (error) return reject(error);
                if (results.length == 0) return reject({
                    code: 'AUTOR_NOT_FOUND',
                    message: 'Autor '+id+' does not exist.',
                    http_code: 404
                });

                let autor = new Autor(results[0].id, results[0].nome);
                resolve(autor);
            });
        });
    }

    this.create = async (newAutor) => {
        let newId = await (new Promise((resolve, reject) => {
            let sql = 'INSERT INTO autor SET nome=?';
            CONN.query(sql, [newAutor.nome], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        }));

        return await this.getById(newId);
    }

    this.update = async (properties, autor) => {
        await (new Promise((resolve, reject) => {
            var values = [];
            properties.forEach((item, i) => {
                values.push(autor[item]);
                properties[i] = item+'=?';
            });
            values.push(autor.id);

            let sql = 'UPDATE autor SET ' + (properties.join(',')) + ' WHERE id=?';
            CONN.query(sql, values, (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        }));

        return await this.getById(autor.id);
    }
}

module.exports = AutorDAO;
