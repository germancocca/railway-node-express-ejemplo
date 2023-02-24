// VAMOR A IMPORTAR express y bodyparser

const express = require("express");
const bodyParser = require("body-parser");

// inicializacion de express
const app = express();
const {API_VERSION} = require('./config');
// Load Routings
//ruta de auth
const authRoutes = require ('./routers/auth');
//ruta de user
const userRoutes = require ('./routers/user');
// ruta para menu
const menuRoutes = require("./routers/menu");
// ruta para newsletter
const newsletterRoutes = require("./routers/newsletter");
// ruta para course
const courseRoutes = require("./routers/courses");
// ruta para post blog
const postRoutes = require("./routers/post");
// Load Routings

//configuramos el bodyparser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configure Header HTTP
// video 9-5 configuracion para no tener que depender de plugin de navegador para, las cors cada vez 
// que hacemos una peticion al servidor
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    // aca decimos que pueden entrar los metodos get, post etc
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    // aca hacemos un next todo correcto
    next();
});

// video 9-5


//...

// Router Basic, utilizara todas las rutas que tenga en definidas en router/user.js
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
// Router Basic

module.exports = app;

