// en index pondremos todas las rutas para que el server no se haga demasiado grande 

const express = require('express');

const app = express();

app.use(require('./usuario'));
app.use(require('./login'));


module.exports = app;
