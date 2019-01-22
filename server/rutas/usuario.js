const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const _ = require('underscore');
//objeto usuario
const Usuario = require('../modelo/usuario');
const { verificartoken, verificarrol } = require('../middlewares/autenticacion');
// servicio  get mostrar usuarios referentes unos filtros
// los middlewares van como segundo argumento
app.get('/usuario', verificartoken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    // parentesis  la condiciones
    Usuario.find({ estado: true }, 'nombre email role img')
        .skip(desde)
        .limit(2)
        .exec((err, resp) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            // entre los {} la condiciones
            Usuario.count({ estado: true }, (err, cont) => {
                res.json({
                    ok: true,
                    resp,
                    conteo: cont
                });
            });

        });

});
// servicio post crear nuevo usuarios
// cuando los middlewares estan en entre[] es  q  debe cumplir  dos condicciones rreferente a la js, autenticacion
app.post('/usuario', [verificartoken, verificarrol], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // la funcion de ecriptacion (la variable a ecriptaar, el numero de vueltas)
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});
//el put es muy utilizado para actualizar datos, en esta caso usuario
app.put('/usuario/:id', [verificartoken, verificarrol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });

});
// elimnar algun registro
app.delete('/usuario/:id', [verificartoken, verificarrol], (req, res) => {
    let id = req.params.id;
    let cambia = {
        estado: false
    };
    // Usuario.findByIdAndDelete(id, (err, resp) => {
    Usuario.findByIdAndUpdate(id, cambia, { new: true }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        if (resp.estado === false) {
            return res.status(400).json({
                ok: false,
                err: err,
                descripcion: 'el usuario ya ha sido borrado'
            });
        }
        res.json({
            ok: true,
            descripc: `el usuario ${resp} ha sido borrado`
        });
    });
});
module.exports = app;