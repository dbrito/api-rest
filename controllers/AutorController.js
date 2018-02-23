function AutorController (conn) {
    const AutorService = new (require('../services/AutorService'))(conn);
    const Autor = require('../models/Autor');

    this.getAll = async function (callback) {
        try { callback(null, await AutorService.getAll()) }
        catch (err) { callback(err) }
    }

    this.getById = async function (id, callback) {
        try { callback(null, await AutorService.getById(id)) }
        catch (err) { callback(err); }
    }

    this.create = async function (req, callback) {
        var newAutor = new Autor(null, req.body.nome);

        try { callback(null, await AutorService.create(newAutor), 201) }
        catch (err) { callback(err); }
    }

    this.update = async function (req, callback) {
        var autor = new Autor();
        var properties = [];
        for (let prop in req.body) {
            autor[prop] = req.body[prop];
            properties.push(prop);
        }
        autor.id = req.params.id;

        try { callback(null, await AutorService.update(properties, autor), 202) }
        catch (err) { callback(err); }
    }
}

module.exports = AutorController;
