// importamos el jwt del package.json, fijarnos de colocar el mismo nombre del paquete que figura en el package.json
const jwt = require("jwt-simple");// el nombre debe ser igual al del package.json
// defino el moment
const moment = require("moment"); // idem que en  el caso de jwt
// creamos clave secreta que a partir de esa clave vamos a generar el nuevo token
const SECRET_KEY = "Coka12D26JAv81";
// creamos clave secreta que a partir de esa clave vamos a generar el nuevo token

// generamos la primera funcion para crear el token
exports.createAccessToken = function (user) {
    const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email:user.email,
        role: user.role,
        createToken: moment().unix(),
        // sino entendemos muy bien podemos ver pagina momentjs.com
        exp: moment()
            .add(3, "hours")
            .unix()
    };

    // encode para codificar el objeto payload
    return jwt.encode(payload, SECRET_KEY); // se que es SECRET_KEY PORQUE VAMOS A YARNPKG.COM Y BUSCAMOS JWT-SIMPLE
};
// generamos la primera funcion para crear el token

// funcion para refrescar tokens, solo se coloca dos parametros porque los otros
// datos son para usarlos dentro de la sesion de usuario
exports.createRefreshToken = function(user) {
    const payload = {
        id: user._id,
        exp: moment()
        .add(30, "days")
        .unix()
        
    };

    return jwt.encode(payload, SECRET_KEY);
};
// funcion para refrescar tokens

//funcion para descodificar nuestro token
exports.decodedToken = function(token) {
    return jwt.decode(token, SECRET_KEY, true);
}
//funcion para descodificar nuestro token
