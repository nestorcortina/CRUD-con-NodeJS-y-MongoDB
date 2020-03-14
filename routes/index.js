const express = require('express');
const router = express.Router();
// importar el controlador
const homeController = require('../controllers/homeController');

module.exports = function () {
    router.get('/', homeController.home);

    // crear contacto
    router.get('/crear-contacto', homeController.formCrearContacto);
    router.post('/crear-contacto',
        homeController.validarErrores,
        homeController.validarForm,
        homeController.crearContacto
    );

    // editar contacto
    router.get('/editar-contacto/:id', homeController.formEditarContacto);
    router.post('/editar-contacto/:id', homeController.editarContacto);

    // eliminar contacto
    router.get('/eliminar-contacto/:id', homeController.eliminarContacto);


    return router;
}