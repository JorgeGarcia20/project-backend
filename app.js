'use strict'
/**
 * Este es nuestro fichero principal, el cual se ejecuta y llamara a todos los modulos
 * necesarios para que el backend funcione
 */
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

//Cargar archivos rutas
var projectRoutes = require('./routes/routes.project')

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Rutas
app.use('/api', projectRoutes)

//Exportar
module.exports = app// Este modulo se exporta a index.js para poder ser ejecutado