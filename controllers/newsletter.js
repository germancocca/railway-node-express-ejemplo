// importo nuestro newsletter
const Newsletter = require('../models/newsletter');

// creo el endpoint para  suscriptcion
function suscribeNewsletter(req, res){
    console.log(req.params);
    // el correo no se va a mandar por el body sino por parametros por la url
    const email = req.params.email;
    const newsletter = new Newsletter();

    // paso email a minisculas
    if(!email){
        res.status(404).send({code: 404, message: "El email es obligatorio"});
    }else{
        newsletter.email = email.toLowerCase();
        newsletter.save((err, newsletterStored) =>{
            if(err){
                res
                    .status(500)
                    .send({code: 500, message: "Error el email ya existe"});
            }else{
                if(!newsletterStored){
                    res
                        .status(404)
                        .send({code: 404, message: "Error al registrar en la newsletter"})
                }else{
                    res
                        .status(200)
                        .send({code: 200, message: "Email registrado correctamente"})
                }
            }
        })
    }
}


// exporto

module.exports = {
    suscribeNewsletter
};