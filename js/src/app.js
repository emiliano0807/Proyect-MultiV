const express = requiere('express');
const config = requiere('./config');
const clientes = requiere('/modulos/clientes/rutas')

const app = express();
//configuracion
app.set('port', config.app.port)
//rutas
app.use('/api/clientes', clientes)
module.exports = app;
