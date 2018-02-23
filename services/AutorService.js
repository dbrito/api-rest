function AutorService(conn) {
    const AutorDAO = new (require('../DAO/AutorDAO'))(conn);

    this.getAll = async () => {
        return await AutorDAO.getAll();
    }

    this.getById = async (id) => {
        return await AutorDAO.getById(id);
    }

    this.create = async (newAutor) => {
        if (!isValidAutor(newAutor, true)) {
            throw {code: 'INVALID_DATA', message: 'Autor is not valid.', http_code: 415};
        }
        return await AutorDAO.create(newAutor);
    }

    this.update = async (properties, autor) => {
        if (!isValidAutor(autor)) {
            throw {code: 'INVALID_DATA', message: 'Autor is not valid.', http_code: 415, autor: autor};
        }
        return await AutorDAO.update(properties, autor);
    }

    function isValidAutor(autor, isNew) {
        if (!isNew) {
            if (isNaN(parseInt(autor.id))) {
                return false;
            }
        }
        else if (typeof autor.nome != 'string' || autor.nome.trim() == '') return false;
        return true;
    }
}



// function Note (connection) {
//     const CONN = connection;

//     this.getNotes = async (callback) => {
//         try {
//             let data = await new Promise((resolve, reject) => {
//                 let sql = 'SELECT * FROM autor';
//                 CONN.query(sql, (error, results, fields) => {
//                     if(error) reject(error);
//                     resolve(results);
//                 });
//             });

//             callback(null, data);
//         } catch (err) {
//             callback(err);
//         }
//     }

//     this.getNoteById = async (id, callback) => {
//         try {
//             let data = await new Promise((resolve) => {
//                 let sql = 'SELECT * FROM autor WHERE id_autor=?';
//                 CONN.query(sql, [id], (error, results, fields) => {
//                     if(error) console.log(error);
//                     resolve(results[0]);
//                 });
//             });

//             callback(null, data);
//         } catch (err) {
//             callback(err);
//         }
//     }

//     this.createNote = async (nome, callback) => {
//         try {
//             let newId = await new Promise((resolve) => {
//                 let sql = 'INSERT INTO autor SET nome=?';
//                 CONN.query(sql, [nome], (error, result, fields)  => {
//                     if(error) console.log(error);
//                     resolve(result.insertId);
//                 });
//             });

//             callback(await this.getNoteById(newId));
//         } catch (err) {
//             callback(err);
//         }
//     }

//     this.deleteNote = async (id, callback) => {
//         try {
//             let data = await new Promise((resolve) => {
//                 let sql = 'DELETE FROM autor WHERE id_autor=?';
//                 CONN.query(sql, [id], (error, result, fields)  => {
//                     if(error) console.log(error);
//                     resolve({'message':'autor ' + id + ' deleted'});
//                 });
//             });

//             callback(null, data);
//         } catch (err) {
//             callback(err);
//         }
//     }

//     this.updateNote = async (id, data, callback) => {
//         try {
//             await new Promise((resolve) => {
//                 let columns = []
//                 for (let key in data) {
//                     columns.push(key + '="' + data[key] + '"');
//                 }

//                 let sql = 'UPDATE autor SET ' + columns.join(',') + ' WHERE id_autor=?';
//                 CONN.query(sql, [id], (error, result, fields)  => {
//                     if(error) console.log(error);
//                     resolve('ok');
//                 });
//             });

//             callback(null, await this.getNoteById(id));
//         } catch (err) {
//             callback(err);
//         }
//     }

// }

// module.exports = Note;



module.exports = AutorService;
