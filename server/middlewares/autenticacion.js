const jwt = require('jsonwebtoken');
//
// verificar token
//
let verificartoken = (req, res, next) => {
    let token = req.get('token'); //autorizacion
    //  consta de 3 parte el  token  capturado por el header, el que tiene  guardado  y el call
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: err
            });
        }
        req.usuario = decoded.usuario;
        next();

    });
};
//
// verificar admin_rol
// verificar si es admi
let verificarrol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLES') { next(); } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'el usuario no es administrador'
            }
        });
    }
};
module.exports = {
    verificartoken,
    verificarrol
};