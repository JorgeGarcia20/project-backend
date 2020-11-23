'use strict'

/**
 * En este fichero definimos las rutas que usaremos para crear, actualizar o eliminar
 * documentos que posteriormente seran subidos a la base de datos
 */

var express = require('express')
//const { getProject } = require('../controllers/project')
var ProjectController = require('../controllers/controller.project')
var router = express.Router()

/*
Para poder subir archivos a la BD es necesario usar connect-multiparty
creamos un middleware que nos permitita establecer la ruta en donde se 
almacenanran nuestros archivos
*/
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart({ uploadDir: './uploads' })

router.get('/home', ProjectController.home)
router.post('/test', ProjectController.test)
router.post('/save-project', ProjectController.saveProject)
router.get('/project/:id?', ProjectController.getProject)
router.get('/projects', ProjectController.getProjects)
router.put('/update-project/:id', ProjectController.updateProject)
router.delete('/delete-project/:id', ProjectController.deleteProject)
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage)
//usamos el middleware como primer parametro, esto permite adjuntar un archivo en la ruta
router.get('/get-image/:image', ProjectController.getImageFile)

//importante: exportar nuestro modulo para poder ser usado en algun otro fichero
module.exports = router