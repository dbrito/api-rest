function AutorRouter (app, conn) {
    const AutorController = new (require('../controllers/AutorController'))(conn);

    app.get('/autors', (req, res) => {
        AutorController.getAll(render(res));
    });

    app.get('/autors/:id', (req, res) => {
        let id = req.params.id;
        AutorController.getById(id, render(res));
    });

    app.post('/autors', (req, res) => {
        AutorController.create(req, render(res));
    });

    app.put('/autors/:id', (req, res) => {
        AutorController.update(req, render(res));
    });

    function render(res) {
        return function (err, data, http_code) {
            if (err) {
                return res.status(err.http_code || 500).send(err);
            }
            res.status(http_code || 200).send(data);
        }
    }
}

module.exports = AutorRouter;
