// importacion de mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchame = Schema({ 
    // aca va el modelo de nuestro usuario, donde el mismo puede tener nombre, 
    // apellido, correo, clave, de usuario entre otros
    name: String,
    lastname: String,
    email: {
        // colocamos entre llaves porque ademas de que sea el correo tipo string sera unicos,
        // es decir que no puede haber otro usuario con el mismo correo
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean, // el usuario estará activo o desactivo lo cual lo usaremos para eliminarlo de forma logica
    avatar: String  // agregamos al modelo de usuario la propiedad de avatar, es string porque va a guardar la url del avatar o imagen del usuario

});

// exportamos el modelo de usuario
module.exports = mongoose.model("User", UserSchame);