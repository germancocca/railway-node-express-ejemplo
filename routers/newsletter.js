// importo express
const express = require ('express');

// importo controlador 
const NewsletterController = require('../controllers/newsletter');

// genero las rutas
const api = express.Router();

//endpoint 
api.post("/suscribe-newsletter/:email", NewsletterController.suscribeNewsletter);

// exportamos las rutas
module.exports = api;