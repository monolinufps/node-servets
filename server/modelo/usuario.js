const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
// de esta manera se el objeto se puede decir , usuario
let Schema = mongoose.Schema;
let roles = {
    values: ['ADMIN_ROLES', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};
let UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correro es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
// el objetivo es que no se devuelva el campo de la contraseña  y tenerla protegida
UsuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjt = user.toObject();
    delete userObjt.password;
    return userObjt;
};
UsuarioSchema.plugin(unique, { message: '{PATH} debe ser unico' });
// se exporta con el nombre usuario haciendo referencia al objeto UsuarioSchema
module.exports = mongoose.model('Usuario', UsuarioSchema);