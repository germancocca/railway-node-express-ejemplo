// importo mongoose
const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const NewsletterSchema = Schema({
    // propiedades
    email: {
        type: String, 
        unique: true
    }
});

// exporto

module.exports = mongoose.model("Newsletter", NewsletterSchema);