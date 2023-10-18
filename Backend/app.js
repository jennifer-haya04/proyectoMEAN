'use strict'

var express = require('express');
var bodyparser = require('body-parser');

var app = express();

//Cargar archivos de rutas

var project_routes = require('./routes/project')
//middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//rutas

/*app.get('/', (req, res) =>{
  res.status(200).send(
    "<h2>Bienvenido a este proyecto</h2>"
  )
})

app.get('/test', (req, res) =>{
  console.log(req.body.nombre);
  var usuario = req.body.nombre;
  res.status(200).send({
    message: "Hola " + usuario + " desde mi API de JS"
  })
})*/

app.use('/api', project_routes);

//exportar
module.exports = app;
