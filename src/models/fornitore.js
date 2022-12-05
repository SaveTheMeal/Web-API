const { default: mongoose } = require("mongoose");

const fornitoreSchema = new mongoose.Schema({
    nomeAttivita: String,
    indirizzoNegozio: String, 
    tipologiaAlimenti: String,
    email : String,
    password: String,
    IBAN: String,
    immagine: String
    //manca coordinate (forse)
});

const Fornitore = mongoose.model('Fornitore',fornitoreSchema );
module.exports = Fornitore;