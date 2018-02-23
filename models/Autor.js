function Autor(id, nome) {
    var _self = this;
    _self.id = id;
    _self.nome = nome;

    this.getIt = function (id) {
        return _self.id;
    }

    this.setIt = function (id) {
        _self.id = id;
    }

    this.getNome = function (nome) {
        return _self.nome;
    }

    this.setNome = function (nome) {
        _self.nome = nome;
    }

    return this;
}

module.exports = Autor;
