'use strict'

var Project = require('../models/model.project')
var fs = require('fs')
var path = require('path')

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: 'Home'
    })
  },

  test: function (req, res) {
    return res.status(200).send({
      message: 'test'
    })
  },

  //Esta funcion guarda un proyecto en la base de datos
  saveProject: function (req, res) {
    var project = new Project() //instancio el objeto Project
    var params = req.body
    //Se definen los parametros que se guardaran en la base de datos
    project.name = params.name
    project.description = params.description
    project.category = params.category
    project.year = params.year
    project.langs = params.langs
    project.image = null

    //El metodo save permite guardar el documento en la base de datos
    project.save((err, projectStored) => {
      //Si existen errores manda un mensaje dependiendo el tipo de error
      if (err) return res.status(500).send({ message: 'Error al guardar el documento.' })
      if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el documento' })

      //Si no existen errores el documento se almacenara en la base de datos
      return res.status(200).send({ project: projectStored })
    })
    /*
    return res.status(200).send({
      params: params
    })
    */
  },

  //Esta funcion devuelve un proyecto de acuerdo al id 
  getProject: function (req, res) {
    var projectId = req.params.id

    if (projectId == null) return res.status(404).send({ message: 'El proyecto no existe' })

    Project.findById(projectId, (err, project) => {
      if (err) return res.status(500).send({ message: 'Error al devolver los datos.' })
      if (!project) return res.status(404).send({ message: 'El proyecto no existe' })

      return res.status(200).send({
        project
      })
    })
  },

  //Esta funcion devulve todos los proyectos que estan en la base de datos.
  getProjects: function (req, res) {
    Project.find({}).sort('-year').exec((err, projects) => {

      if (err) return res.status(500).send({ message: 'Error al devolver los datos' })
      if (!projects) return res.status(404).send({ message: 'No existen proyectos' })

      return res.status(200).send({ projects })

    })
  },

  //Esta funcion permite actualizar in documento de la base de datos
  updateProject: function (req, res) {
    var projectId = req.params.id
    var update = req.body

    Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
      if (err) return res.status(500).send({ message: 'Error al actualizar' })
      if (!projectUpdated) return res.status(404).send({ message: 'No existe el proyecto para actualizarlo' })

      return res.status(200).send({
        project: projectUpdated
      })
    })
  },

  // Esta funcion permite eliminar un documento de la base de datos a partir de su id
  deleteProject: function (req, res) {
    var projectId = req.params.id

    Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
      if (err) return res.status(500).send({ message: 'Error al eliminar el proyecto' })
      if (!projectRemoved) return res.status(404).send({ message: 'El proyecto para eliminar no existe' })

      return res.status(200).send({ project: projectRemoved })
    })
  },

  //Esta funcion permite subir los archivos que se especifiquen, en este caso imagenes
  uploadImage: function (req, res) {
    var projectId = req.params.id


    if (req.files) {
      //En esta variable se almacena la ruta del archivo
      var filePath = req.files.image.path

      // Se recorta el nombre del documento para que sea mas comprensible al almacenarse
      var fileSplit = filePath.split('\\')
      var fileName = fileSplit[1]

      // Se recorta el nombre del archivo, de modo que solo se obtenga su extension
      var extSplit = fileName.split('\.')
      var fileExt = extSplit[1]

      // Si la extencion del archivo es alguna de los siguientes se procede a almacenar el archivo
      if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
        Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
          if (err) return res.status(500).send({ message: 'No se ha podido subir la imagen' })
          if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe, imposible subir imagen' })
          return res.status(200).send({ project: projectUpdated })
        })
        // Si la extension no es correcta el arhivo no se guardara y arrojara un mensaje.
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({ message: 'La extension no es valida' })
        })
      }
      //Si exsiste algun otro error se notificara.
    } else {
      return res.status(200).send({ message: 'No se pudo cargar la imagen' })
    }
  },

  getImageFile: function (req, res) {
    var file = req.params.image
    var path_file = './uploads/' + file

    fs.stat(path_file, (exists) => {
      if (res) {
        return res.sendFile(path.resolve(path_file))
      } else {
        return res.status(200).send({
          message: 'No existe la imagen...'
        })
      }
    })
  }
}

module.exports = controller