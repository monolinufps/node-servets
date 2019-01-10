require('./config/confi');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// servicio  get actualizar registros
app.get('/usuario/:id/:man', function(req, res) {
    let id = req.params.id;
    let man = req.params.man;
    res.json({
        id,
        man
    });
});
// servicio post crear nuevo registros
app.post('/usuario', function(req, res) {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            desc: 'nombre necesario'
        });
    } else {
        res.json({
            body
        });
    }
});
//el put es muy utilizado para actualizar data
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});
// elimnar algun registro
app.delete('/usuario', function(req, res) {
    res.json('deleteUsuario');
});
app.listen(process.env.PORT, () => {
    console.log('escucha en el puerto', process.env.PORT);
});