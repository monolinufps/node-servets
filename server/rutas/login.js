const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../modelo/usuario');


app.post('/login', function(req, res) {
    let body = req.body;
    // solamente va buscar  y va devolver un email
    Usuario.findOne({ email: body.email }, (err, uBD) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        // verificar contraseña
        if (!uBD || !bcrypt.compareSync(body.password, uBD.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o Contraseña incorrecta'
                }
            });
        }
        // crear token y la caducidad del mismo
        let token = jwt.sign({
            usuario: uBD
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: uBD,
            token
        });

    });

});
module.exports = app;