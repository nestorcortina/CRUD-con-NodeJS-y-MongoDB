const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

// para poder usar variables de entorno
require('dotenv').config({
    path: 'variables.env'
});


// crear una app de express
const app = express();

// habilitar body-parser
app.use(bodyParser.urlencoded({ extended:false }));

// habilitar carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// habilitar hbs con templane engine
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

// static file
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes());

// escuchar puerto por donde correra la app
const port = process.env.PORT || process.env.PUERTO;
app.listen(port, function () {
    console.log('Server on '+ port);
})