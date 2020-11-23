'use strict'
/**
 * En este fichero se crea el servidor y 
 * se realiza la conexion a la base de datos
 */

//conexion a la base de datos
var mongoose = require('mongoose')
var app = require('./app')//se recibe el modulo app
var port = 3000

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/portafolio')
  .then(() => {
    console.log('Conexion a la base de datos establecida!')

    //creacion del servidor
    app.listen(port, () => {
      console.log('Servidor corriendo en localhost:3000')
    })

  })
  .catch(err => console.log(err))