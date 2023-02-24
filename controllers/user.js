// importamos el filesystem
const fs = require("fs");
// importamos el path
const path = require("path"); 

// vamos a importar dentro de controlador el user.js
const bcrypt = require("bcrypt-nodejs"); // para hacer encriptaciones de las contraseñas
// importamos nuestro modelo
const User = require("../models/user");  
// importamos nuestro modelo

//importamos paquete
const jwt = require("../services/jwt");
const { log, Console } = require("console");
const { param } = require("../routers/user");
const { exists } = require("../models/user");
const user = require("../models/user");
// importamos paquete 

//funcion para registrarse
function signUp(req, res){
    //console.log('Endpoint de signUp ejecutado.');
    const user = new User();
    const { name, lastname, email, password, repeatPassword} = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase(); // toLowerCase() transforma todo a minusculas
    user.role = "admin";
    user.active = false;
    
    // para encriptar la clave
    if (!password || !repeatPassword){
        res.status(404).send({message: "Las contraseñas son obligatorias"});
    }else{
        //console.log('Continuar....');
        if(password !== repeatPassword){
            res.status(404).send({message: "Las contraseñas no coinciden"});
        }else{
            bcrypt.hash(password, null, null, function (err, hash){
                if (err){
                    res
                        .status(500)
                        .send({message: "Error al encriptar la contraseña"});
                }else{
                    user.password = hash;
                    user.save((err, userStored) => {
                        if(err){
                            res.status(500).send({message: "Error el usuario ya existe."})
                        }else{
                            if(!userStored){
                                res.status(404).send({message: "Error al crear el usuario."})
                            }else{
                                res.status(200).send({user: userStored})
                            }

                        }

                    })
                   //res.status(200).send({message:hash});
                }
            }); 
           // res.status(200).send({message: "Usuario creado."})
        }
    }

    // para encriptar la clave
    //const {} = req.body;
}


// creamos una nueva funcion para iniciar sesion de usuario
function signIn(req, res){
    //console.log("Login correcto...."); este lo usamos para saber si la funcion estaba funcionando
    // exportamos y generamos la ruta vacia y una vez que controlamos que esta bien, programamos
    const params = req.body;
    //console.log(params);
    const email = params.email.toLowerCase();
    const password = params.password;

    // userStored es donde va a estar el usuario en el caso de que existiece
    User.findOne({email}, (err, userStored) => {
        if (err){
            res.status(500).send({message: "Error en el servidor."});
        } else {
            if (!userStored){
                res.status(404).send({message: "Usuario no encontrado"});
            } else {
                // ahora va a comparar las claves, pero tener en cuenta que en la base de datos esta encriptada
                // para eso usaremos el paquete bcrypt ya que tiene una funcion que compara una contraseña encriptada con una sin
                console.log(userStored);
                bcrypt.compare(password, userStored.password, (err, check) =>{
                    // esta funcion de flecha tiene un error o un check, que puede ser correcto o no es correcto
                    if (err) {
                        res.status(500).send({message: "Error en el servidor."});
                    } else if(!check) {
                        res.status(404).send({message: "La contraseña es incorrecta"});

                    } else {
                        // si llaga aca significa que la contraseña es correcta pero el usuario puede logearse si el mismo esta activo
                        if (!userStored.active){
                            res
                            .status(200)
                            .send({code:200, message: "El usuario no se ha activado"});
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                        //res.status(200).send({message: "Ha funcionando"})
                    }
                });
            }
        }
    });


}
// creamos una nueva funcion para iniciar sesion de usuario


// video 9-3 creacion de endpoint server
function getUsers(req, res){
    //console.log("get user"); para probar que funcionaba el endpoint
    // ahora vamos a obtener los usuarios, esto nos va a devolver todos los usuarios que hay en la base de datos
    User.find().then(users => {
        if(!users) {
            res.status(404).send({message: "No se ha encontrado ningun usuario" });

        } else {
            // si significa que tenemos usuarios registrados
            res.status(200).send({users});
        }
    });

    // ahora vamos a obtener los usuarios, esto nos va a devolver todos los usuarios que hay en la base de datos
}
// video 9-3 creacion de endpoint server

// video 9-7
function getUsersActive(req, res){
    //console.log("get user"); para probar que funcionaba el endpoint
    // definimos una constante y vamos a obtener la query de la request
    console.log(req);
    const query = req.query;


    // ahora vamos a obtener los usuarios, esto nos va a devolver todos los usuarios que hay en la base de datos
    // modificamos el find, abrimos un objeto y le decimos que queremos encontrar los 
    // usuarios que tengan la propiedad activa tal como nos llega en req.query
    User.find({active: query.active}).then(users => {
        if(!users) {
            res.status(404).send({message: "No se ha encontrado ningun usuario" });

        } else {
            // si significa que tenemos usuarios registrados
            res.status(200).send({users});
        }
    });

    // ahora vamos a obtener los usuarios, esto nos va a devolver todos los usuarios que hay en la base de datos
}
// video 9-7

// 9-16-12
function uploadAvatar(req, res){
    // params porque le vamos a mandar el id del usuario porque ademas de subir el avatar lo que 
    // va hacer es actualizarlo en el usuario
    const params = req.params;
    //console.log("uploadAvatar"); // para pobar el endpoint
    //console.log(params); // para probar el endpoint

    User.findById({_id: params.id}, (err, userData) =>{
        if(err){
            // si hay error en el servidor
            res.status(500).send({message: "Error del servidor"});    
        }else{
            if(!userData){
                // no se encontro usuario
                res.status(404).send({message: "No se ha encontrado ningun usuario"});
            }else{
                // se encontro el usuario
                let user = userData;

                //console.log(userData);
                //console.log(user); // para probar
                //console.log(req.files); // para probar

                if(req.files){
                    // si viene un fichero, le ponemos el nombre avatar porque es el mismo 
                    // que pusimos en el POSTMAN
                    let filePath = req.files.avatar.path;
                    // queremos splitearlo porque nos interesa el nombre del avatar no la url de la imagen
                    let fileSplit = filePath.split("/");
                    //let fileName = fileSplit[2];
                    let fileName = filePath.replace(/^.*[\\\/]/, '');
                    let fileExt = filePath.split(".").pop();    
                    //let extSplit = filePath.split(".").pop();

                    console.log(fileName);
                    console.log(fileExt);

                    if (fileExt !== "png" && fileExt !== "jpg"){
                        // solo vamos a permitir png o jpg 
                        res.status(400)
                        .send({message: "La extension de la imagen no es valida (Extensiones permitidas: .png y .jpg)"});

                    }else {
                        // tomamos user y le agregamos la propiedad avatar
                        // no vamos a guardar la url de la imagen, solo vamos a guardar la imagen
                        user.avatar = fileName;
                        // va a buscar el usuario con ese id y traera los datos de user(los de let user = userData) 
                        // y esto nos dara de resultado o err o userResult()
                        User.findByIdAndUpdate({_id: params.id}, user, (err, userResult) => {
                              if (err){
                                res.status(500).send({message: "error del servidor"});
                              }else{
                                if(!userResult){
                                    res.status(404).send({message: "No se ha encontrado ningun usuario"});
                                }else{
                                    res.status(200).send({avatarName: fileName});
                                }
                              }      
                        });
                    }
                }
            }
        }
    });
}
// 9-16-12

// 9-18 nueva funcion para obtener el avatar guarado
function getAvatar(req, res){

    // para probar que funcion 
    // console.log("getAvatar...."); para probar 
    const avatarName = req.params.avatarName;
    // vamos a completar la url de la imagen

    console.log(avatarName);

    const filePath = "./uploads/avatar/" + avatarName;
    // funcion que devuelve el filePath y el exists
    console.log ("la ruta es:", filePath);

    fs.stat("./uploads/avatar/" + avatarName, (error, stats) => {
        if (error) {
          console.log(error);
          res.status(500)
          .send({message: "El archivo no existe"});
        }
        else {
          // devuelve el avatar
          res.sendFile(path.resolve(filePath));
        }
      });
    
}
// 9-18 nueva funcion para obtener el avatar guarado

//9-19 nueva funcion para updatear datos del usuario
// 9-24 hacemos 
async function updateUser(req, res){
    //console.log("udpateUser....prueba"); // para prueba del endpoint
    const userData = req.body;
    console.log(userData);
    
    const params = req.params;

    if(userData.password){
        // encryptamos la contraseña del usuario, puede devolver error(err) o la constraseñan encriptada(hash)
        await bcrypt.hash(userData.password, null, null, (err, hash) => {
            if(err){
                // si hay error en la encryptacion
                res.status(500).send({message: "Error al encriptar la contraseña."});
            }else{
                // sino hay error, actualizamos la contraseña con el hash que es la clave ya encriptada
                userData.password = hash; 
            }
        });
    };

    // le pasamos el id de usuario y los datos que queremos actualizar e userData, 
    //buscara el id en la base de datos y actualizara los datos
    // en el caso de que no exista el id lo creara.
    // pasamos el idm en params.id, los datos del usuario userData, error y userUpdate
    User.findByIdAndUpdate({_id: params.id}, userData, (err, userUpdate)=>{
        if(err){
            // error del servidor
            res.status(500)
            .send({message: "Error del Servidor"});
        }else{
            if(!userUpdate){
                // no se encontro ningun usuario
                res.status(404)
                .send({message: "No se ha encontrado ningun usuario."});    
            }else{
                // se encontro el usuario
                res.status(200)
                .send({message: "Usuario actualizado correctamente."});
            }
        }        


    });
}
//9-19 nueva funcion para updatear datos del usuario


// 9-25 funcion para activar usuario
function activateUser (req, res){

    // para probar
    console.log('activando usuario....');
    // pasamos el id por parametro
    const { id } = req.params;
    // en body vamos a enviar el status, el activate
    const { active } = req.body;

    // para probar
    console.log(id);
    console.log(active);

   
    User.findByIdAndUpdate(id, { active }, (err, userStored) => {
        if (err){
            // si existe error en la activacion
            res.status(500)
            .send({message: "Error del servidor"});
        }else{
            // condicional sino existe el userStored
            if(!userStored){
                // sino existe el usuario almacenado, significa que el id enviado es erroneo, no existe ningun usuario
                res.status(404)
                .send({message: "No se ha encontrado el usuario"});
            }else{
                // significa que todo ha ido bien pero falta saber si active es true o false
                if(active === true){
                    // si el usuario administrador quiere activar el usuario
                    res.status(200)
                    .send({message: "El usuario ha sido activado correctamente"});
                }else{
                    // si el usuario administrador quiere desactivar el usuario
                    res.status(200)
                    .send({message: "El usuario ha sido desactivado correctamente"});
                }
            }
        }
    });
}
// 9-25 funcion para activar usuario


// 9-27 endpoint para eliminar usuario
function deleteUser(req, res){
    console.log("delete usuario....");
    // el nombre de la clave es id porque es el nombre que pusimos en la ruta
    const {id} = req.params;

    User.findByIdAndRemove(id, (err, userDelete) => {
        if(err){
            // si existe error, mandamos error del servidor
            res.status(500)
            .send({message: "Error del servidor"});    
        }else{
            if(!userDelete){
                // sino existe el usuario buscado
                res.status(404)
                .send({message: "El usuario no se ha encontrado"});
            }else{
                // si salio todo bien
                res.status(200)
                .send({message: "El usuario ha sido eliminado correctamente"});
            }
        }
    });


}

// 9-27 endpoint para eliminar usuario

function signUpAdmin(req, res){
    console.log("singupAdmin....");

    // nuevo usuario
    const user = new User();
    // req body tendra los datos de usuario
    const {name, lastname, email, role, password} = req.body;
    user.name = name;
    user.lastname = lastname;
    // para guardar siempre mail en minuscula
    user.email = email.toLowerCase();
    user.role = role;
    user.active = true;

    // valido contraseña y encripto
    if (!password){
        res.status(500)
        .send({message: "La constraseña es obligatoria"});
    }else{
        // para encriptar
        bcrypt.hash(password, null, null, (err, hash) =>{
            if(err){
                // si existe error
                res.status(500)
                .send({message: "Error al encriptar contraseña"});
            }else{
                // si todo ha ido bien
                user.password = hash;
                // creamos el usuario con user.save, es una funcion de mongoose
                user.save((err, userStored) =>{
                    if(err){
                        res.status(500)
                        .send({message: "El usuario ya existe"});
                    } else{
                        if(!userStored){
                            res.status(500)
                            .send({message: "Error al crear el nuevo usuario"});
                        }else{
                            // creamos el usuario, vamos a enviar el objeto user con los datos del usuario que se ha creado
                            res.status(200)
                            //.send({user: userStored});
                            .send({message: "El usuario ha sido creado de forma correcta"});
                            // si quisiera mensaje en vez que devuelva los datos .send({message: "El usuario ha sido creado correctamente"})
                        }
                    }
                });
                
            }    
        });
    }
}



// para exportar
module.exports = {
    // objeto
    signUp,
    signIn,
    getUsers, 
    getUsersActive,
    uploadAvatar,
    getAvatar,
    updateUser, 
    activateUser,
    deleteUser,
    signUpAdmin
};