// importacion de express
const express = require("express");
// importacion de express
const UserController = require("../controllers/user");
// 9-16-12 importacion del connect-multiparty, vamos a llamarlo multipart
// y lo vamos a importar desde connect-multiparty
const multipart = require ("connect-multiparty");
// 9-16-12 importacion del connect-multiparty

// video 9-4 importo el authenticated
const md_auth= require("../middleware/authenticated");
// video 9-4 importo el authenticated
// 9-16-12 creamos middleware para subir y moverlo especificando la carpeta donde subiremos el avatar
const md_upload_avatar = multipart({uploadDir: "./uploads/avatar"});
// 9-16-12 creamos middleware para subir y moverlo especificando la carpeta donde subiremos el avatar

// va a generar las rutas
const api = express.Router();
// va a generar las rutas
// .post significa que es un endpoint de tipo post, entre parentisis la ruta del
// endpoint y ejecuta la funcion UserController.signUp
api.post("/sign-up", UserController.signUp); //UserController.signUp va a ejecurar la funcion signUp de controllers signUp
// creamos una nueva ruta
api.post("/sign-in", UserController.signIn);
// creamos una nueva ruta

// video 9-3 agregamos nueva ruta del endpoint, en el 9-4 modificamos el endpoint 
// agregando el md_auth.ensureAuth
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
// video 9-3 agregamos nueva ruta del endpoint

// video 9-7 creamos nuevo endpoint para usuarios activos, nombre users-active, middleware para proteger url, funcion 
api.get("/users-active", [md_auth.ensureAuth] , UserController.getUsersActive);
// video 9-7 creamos nuevo endpoint para usuarios activos

// 9-16-12 endpoint para subir avatar, le especificamos que le pasamos como parametro al endpoint el id del usuario
// usaremos dos middleware uno de autentucacion con el login y otro para recoger el fichero
// y moverlo
api.put("/upload-avatar/:id", [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
// 9-16-12 endpoint para subir avatar


//9-18 endpoint para obtener o recuperar avatar de usuario
// no usaremos en este endpoint middleware para proteger ya que solo va a devolver imagenes o avatar no sensibles
api.get("/get-avatar/:avatarName", UserController.getAvatar);
//9-18 endpoint para obtener avatar de usuario

//9-19 endpoint para updatear datos del usuario, protegemos con middleware de login 
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
//9-19 endpoint para updatear datos del usuario

// 9-25 endpoint para activar usuario, este sera del tipo protegido
// y como actualiza campo active es de tipo put, recibe id usuario por parametro
api.put("/activate-user/:id",[md_auth.ensureAuth],UserController.activateUser);
// 9-25

// 9-27
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);
// 9-27

// 9-30 endpoint para registrar usuarios desde admin
api.post("/sign-up-admin/", [md_auth.ensureAuth], UserController.signUpAdmin);
// 9-30 endpoint para registrar usuarios desde admin




// por ultimo exportamos ya que lo estamos guardando en api
module.exports = api;