// importo mongoose
const mongoose = require ('mongoose');
// importo para paginacion
const mongoosePaginate = require('mongoose-paginate');
// creo el esquema 
const Schema = mongoose.Schema;

// defino la base de datos 
const PostSchema = Schema({
    // propiedades o atributos
    title: String,
    url: {
        type: String,
        // sera unico
        unique: true
    },
    // todo lo que quiera mostrar, todos los mensajes
    description: String,
    date: Date
});
PostSchema.plugin(mongoosePaginate);

// exporto 
module.exports = mongoose.model("Post", PostSchema);