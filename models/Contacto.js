const mongoose = require('mongoose');

const contactosSchema = new mongoose.Schema({
    nombre: {
        type: 'string',
        trim: true,
        required: 'El nombre es obligatorio'
    },
    email: {
        type: 'string',
        unique: true,
        lowercase: true,
        trim: true,
        required: 'El email es obligatorio'
    },
    celular: {
        type: 'string',
        trim: true,
        required: 'El celular es obligatorio'
    }
});

module.exports = mongoose.model('Contacto', contactosSchema);