'use strict'

const project = require('../models/project');
var Project = require('../models/project')
var fs = require('fs');
var path = require('path');

var controller = {
  home: function(req, res){
    return res.status(200).send({
      message: 'Soy la Home'
    })
  },

  test: function(req, res){
    return res.status(200).send({
      message: 'Soy la Test'
    })
  },

  saveProject: function(req, res){
    var project = new Project();
    console.log(req.body);
    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((err, projectStored) => {
      if(err) return res.status(500).send({message: 'Error al guardar el documento'});

      if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});
      console.log(project);
      console.log(projectStored);
      return res.status(200).send({project: projectStored});
    });

  },

  getproject: function(req,res){
    var projectId = req.params.id;

    //Si ID es opcional
    //if(projectId == null) return res.status(404).send({message: 'El documento no existe'});

    Project.findById(projectId, (err, project) =>{
      if(err) return res.status(500).send({message: 'Error al devolver los datos'});

      if(!project) return res.status(404).send({message: 'El documento no existe'});

      return res.status(200).send({
        project
      });
    });
  },

  getProjects: function(req, res){
    Project.find({}).exec((err, projects) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos'});

      if(!projects) return res.status(404).send({message: 'No hay proyectos que mostrar'});

      return res.status(200).send({projects});
    });
  },

  updateProject: function(req, res){
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(projectId, update, {new:true }, (err, projectUpdate) =>{
      if(err) return res.status(500).send({message: 'Error al actualizar'});

      if(!projectUpdate) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

      return res.status(200).send({project: projectUpdate});
    });

  },

  deleteProject: function(req, res){
    var projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, proyectDelete)  => {
      if(err) return res.status(500).send({message: 'No se ha podido eliminar el proyecto'});

      if(!proyectDelete) return res.status(404).send({message: 'No se puede eliminar ese proyecto'});

      return res.status(200).send({proyectDelete});
    });
  },

  uploadImage: function(req, res){
    var projectId = req.params.id;
    var fileName = 'Imagen no subida...'

    if(req.files){
     
      var filePath = req.files.image.path;
      var fileSplit = filePath.split('\\');
      var fileName = fileSplit[1];

      var extSplit = fileName.split('\.');
      var fileExt = extSplit[1];

      if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpg' || fileExt == 'gif'){
        Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdate) => {
          if(err) return res.status(500).send({message: 'La imagen no ha subido'});
  
          if(!projectUpdate) return res.status(404).send({message: 'El proyecto no existe y la imagen no ha cargado'});
  
          return res.status(200).send({
            project: projectUpdate
          });
        });
      }else{
        fs.unlink(filePath, (err) => {
          return res.status(200).send({message: 'La extensión no es valida'});
        });
      }

    }else{
      return res.status(500).send({
        message: 'Error al subir imagen'
      });
    }
  },

  getImageFile: function(req, res){
    var file = req.params.image;
    var path_file = './uploads/'+file;

    fs.exists(path_file, (exists) =>{
      if(exists){
        return res.sendFile(path.resolve(path_file));
      }else{
        return res.status(200).send({
          message: "No existe la imagen"
        });
      }
    });
  }

};


module.exports = controller;