// importo express
//const { application } = require('express');
const express = require('express');

// importo controlador post
const PostController = require('../controllers/post');

// importo autenticacion para proteger endpoint mediante token
const md_auth = require('../middleware/authenticated');
// genero las rutas
const api = express.Router();

// endpoints
// endpoint para agregar post
api.post("/add-post", [md_auth.ensureAuth], PostController.addPost);
// endpoint para obtener los post
api.get("/get-posts", PostController.getPosts);
// endpoint para actualizar los posts 
api.put("/update-post/:id", [md_auth.ensureAuth], PostController.updatePost);
// endpoint para eliminar post
api.delete("/delete-post/:id", [md_auth.ensureAuth], PostController.deletePost);
// endpoint para obtener un post especifico
api.get("/get-post/:url", PostController.getPost);

// exporto las rutas
module.exports = api;