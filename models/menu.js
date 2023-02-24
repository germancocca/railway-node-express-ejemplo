// importamos mongoose
const mongoose = require('mongoose');

//creamos nuestro esquema
const Schema = mongoose.Schema;

// creamos el esquema de nuestro menu con las propiedades: titulo, url, orden, activo o desactivo

const MenuSchema = Schema({
    title: String,
    url: String,
    order: Number,
    active: Boolean
});

// exportamos
module.exports = mongoose.model("Menu", MenuSchema);

