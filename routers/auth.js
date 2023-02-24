// importamos express
const express = require ('express');
// importamos el AuthController
const AuthController = require('../controllers/auth');

// express va empezar a generar las rutas
const api = express.Router();

// vamos a crear un endpoint va hacer un post para refrescar el acessToken
// url refresh-access-token, AuthController va a ejecutar funcion que se ejecutara refreshAccessToken
// api.metodo("url", importacion_controllers.funcion_a_ejecutar);
api.post("/refresh-access-token", AuthController.refreshAccessToken);

module.exports = api;