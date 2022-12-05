const { default: mongoose } = require("mongoose");

const acquistoSchema = new mongoose.Schema({
    acquirente: String,
    meal: String, 
    presenzaIntolleranze: Boolean,
    intolleranze : String,
    isPaid: Boolean,
    borsa: Boolean,
    stato: String
});

const Acquisto = mongoose.model('Acquisto',acquistoSchema );
module.exports = Acquisto;