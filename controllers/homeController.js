const mongoose = require('mongoose');
const Contacto = mongoose.model('Contacto');
// importar express validator
const { check, validationResult } = require('express-validator');

exports.validarErrores = [
    check('nombre', 'El nombre es obligatorio').notEmpty().escape(),
    check('email', 'Ingrese un email valido').isEmail().escape(),
    check('celular', 'El celular no puede ir vacio').notEmpty().escape()
]

exports.validarForm = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errores = errors.errors.map(error => error.msg);
        const input = {
            nombre: req.body.nombre,
            email: req.body.email,
            celular: req.body.celular
        }
        
        res.render('crear-contacto', {
            nombrePagina: 'Crear Contacto',
            errores,
            input
        });
        return;
    }

    next();
} 


// inicio
exports.home = async (req, res, next) => {
    const contacto = await Contacto.find();

    if (!contacto) return next();

    let contactos = [];
    for (let i = 0; i < contacto.length; i++) {
        contactos[i] = {
            id: contacto[i]._id,
            nombre: contacto[i].nombre,
            email: contacto[i].email,
            celular: contacto[i].celular
        }
    }

    res.render('home', {
        nombrePagina: 'Inicio',
        contacto: contactos
    });
}

// crear contacto
exports.formCrearContacto = (req, res) => {
    res.render('crear-contacto', {
        nombrePagina: 'Crear Contacto'
    });
}

exports.crearContacto = async (req, res) => {
    const contacto = await Contacto(req.body);
    try {
        await contacto.save();
        res.redirect('/');
    } catch (error) {
        const input = {
            nombre: req.body.nombre,
            email: req.body.email,
            celular: req.body.celular
        }
        res.render('crear-contacto', {
            nombrePagina: 'Crear Contacto',
            error: 'Email ya registrado',
            input
        });
    }
}

// editar contacto
exports.formEditarContacto = async (req, res) => {
    const { id } = req.params;
    const contacto = await Contacto.findById(id);

    const contactos = {
        id: contacto._id,
        nombre: contacto.nombre,
        email: contacto.email,
        celular: contacto.celular
    }
    res.render('editar-contacto', {
        nombrePagina: 'Editar Contacto',
        contacto: contactos
    });
}

exports.editarContacto = async (req, res) => {
    const { id } = req.params;
    const contacto = await Contacto.findById(id);
    contacto.nombre = req.body.nombre;
    contacto.email = req.body.email;
    contacto.celular = req.body.celular;
    await contacto.save();
    res.redirect('/');
}

// eliminar contacto
exports.eliminarContacto = async (req, res) => {
    const {
        id
    } = req.params;
    const contacto = await Contacto.findById(id);

    if (contacto) {
        contacto.remove();
        res.redirect('/');
    } else {
        res.redirect('/');
    }

}