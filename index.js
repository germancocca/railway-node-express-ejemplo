const mongoose = require("mongoose");
// importamos el app desde app.js
const app = require("./app");

// importamos el puerto
const port = process.env.PORT || 3977;
const {API_VERSION, IP_SERVER, PORT_DB} = require("./config");

// la conexion la vamos hacer con mongoose

// de forma mas estatica seria:

// mongoose.connect(`mongodb://localhost:27017/germancocca`); donde germancocca es el nombre de la base de datos

// para resolver errror deprecaationwarning usefindandmodify

//mongoose.set("useFindAndModify", false);

// para resolver errror deprecaationwarning usefindandmodify

mongoose.connect(
    //`mongodb://${IP_SERVER}:${PORT_DB}/germancocca`, 
    `mongodb+srv://gercocca:12345@webpersonal.yqktox5.mongodb.net/?retryWrites=true&w=majority
    `,
    {useNewUrlParser: true, useUnifiedTopology: true},

    (err, res) => {
        if(err){
            throw err;
        }else{
            console.log("la conexion a la base de datos es correcta");

            app.listen(port, () =>{
                console.log("###########################################");
                console.log("#############    API REST         #########");
                console.log("###########################################");
                console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);

            })
        }
    });

// es idem que hacer asi mongoose.connect(`mongodb://localhost:27017/germancocca`);


