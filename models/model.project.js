'use strict'
//Representa un documento de la base de datos
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var projectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String
})

module.exports = mongoose.model('Project', projectSchema)
//projects --> guarda los documentos en la coleccion