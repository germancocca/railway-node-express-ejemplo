// importo mongoose
const mongoose = require ('mongoose');
// creo el esquema
const Schema = mongoose.Schema;

// defino la base de datos
const CoursesSchema = Schema({
    // propiedades o atributos
    idCourse: {
        type: Number,
        unique: true,
        required: true
    },
    link: String,
    // cupon de descuento
    coupon: String,
    price: Number,
    order: Number
});

// exporto 
module.exports = mongoose.model("Courses", CoursesSchema);