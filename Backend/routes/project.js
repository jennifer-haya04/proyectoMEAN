'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
//Con parametro Obligatorio
router.get('/getproject/:id', ProjectController.getproject);
//Con parametro opcional
//router.get('/project/:id?', ProjectController.getproject)

router.get('/getprojects', ProjectController.getProjects);
router.put('/getproject/:id', ProjectController.updateProject);
router.delete('/getproject/:id', ProjectController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/getImage/:image', ProjectController.getImageFile);

module.exports = router;

