'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.set('strictQuery',true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portafolio')
  .then(() => {
    console.log("Conexion exitosa a Mongo")

    //Creacion de servidor

    app.listen(port, () =>{
      console.log("Servidor corriendo correctamente en puerto 3700")
    })

  })
  .catch(err => console.log(err));