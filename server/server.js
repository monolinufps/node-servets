require('./config/confi');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// las rutas  de nuestros servicios
app.use(require('./rutas/index'));
// conexion con la bd mongobd , puerto =27017 y nombre =test
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos ONLINE');
});
// por donde esta escuchando el puerto
app.listen(process.env.PORT, () => {
    console.log('escucha en el puerto', process.env.PORT);
});