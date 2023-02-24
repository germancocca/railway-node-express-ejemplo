// vamos hacer el servicio, el endpoint para refrescar ese accessToken
// importamos jwt
const jwt = require ('../services/jwt');
// importamos el moment
const moment = require ('moment');
// importamos el modelo de usuario
const User = require ('../models/user');

// funcion para verificar si el token ha expirado del lado del server, independiente que tambien lo estamos haciendo del lado del cliente
function willExpireToken(token){
    const {exp} = jwt.decodedToken(token);
    // sacamos la fecha actual en formato unix con moment
    const currentDate = moment().unix();

    if(currentDate > exp){
        // si ha expirado devolvermos true
        return true;
    }
    // si todavia no ha expirado devolvemos false
    return false;
}

// funcion que se va a encargar de refrescar el accessToken
function refreshAccessToken(req, res) {
    // para pobar
    //console.log('estamos refrescando el access token');
    // para pobar, una vez que comprobamos que funciona vamos a programarlo
    // recogemos el token
    const { refreshToken } = req.body; // req.body va a venir de body
    //console.log(refreshToken); // para probar con el postman y la consola enviar send
    const isTokenExpired = willExpireToken(refreshToken);

    console.log(isTokenExpired); //si es false es que no caduco si da true es que si

    if (isTokenExpired) {
        res.status(404).send({message: "El refreshToken ha expirado"});
    }else {
        const { id } = jwt.decodedToken(refreshToken);

        User.findOne({ _id: id }, (err, userStored) => {
            if (err) {
                // si es verdadero es que existe un error
                res.status(500).send({message: "error de servidor"});
            } else {
                if (!userStored) {
                    res.status(404).send({message: "Usuario no encontrado"});
                } else {
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStored),
                        refreshToken: refreshToken // porque refreshToken no se actualiza solo se actualiza el accessToken
                    });
                }
            }
        });
        
    }
    
}

module.exports = {
    refreshAccessToken
};