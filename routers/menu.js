// importamos express
const express = require("express");

//importamos el controlador del menu
const MenuController = require("../controllers/menu");

// importamos el authenticated
const md_auth = require("../middleware/authenticated");

//va a generar las rutas
const api = express.Router();

//endpoint 
api.post("/add-menu", [md_auth.ensureAuth], MenuController.addMenu);

// endpoint para obtener todos los menus
api.get("/get-menus", MenuController.getMenus);

//endpoint para actualizar menus
api.put("/update-menu/:id", [md_auth.ensureAuth], MenuController.updateMenu);


//endpoint para activar o desactivar menu
api.put("/activate-menu/:id", [md_auth.ensureAuth], MenuController.activateMenu);

//endpoint ruta para eliminar menu
api.delete("/delete-menu/:id", [md_auth.ensureAuth], MenuController.deleteMenu);


//exportamos las rutas
module.exports = api;

