// importamos jwt-simple y el moment
const jwt = require("jwt-simple");
const moment = require("moment");

// vamos a obtener nuestra key, la tenemos en services
const SECRET_KEY = "Coka12D26JAv81";
// vamos a obtener nuestra key, la tenemos en services

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        // significa que el usuario no envia cabecera, no ha mandado ningun token
        res.status(403)
        .send({message: "La peticion no tiene cabecera de autenticacion"});

    }

    // vamos a formatear un poco el token

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, SECRET_KEY); // para pode decodificar

        if (payload.exp <= moment.unix()) {
            // significa que el token ha expirado
            return res.status(404).send({message: "el token ha expirado"});
        }

    }catch (ex){
        // console.log(ex);
        //significa que el token es invalido
        return res.status(404).send({message: "Token invalido"});

    }

    // si todo lo pasa correctamente
    req.user = payload;
    next();

};



