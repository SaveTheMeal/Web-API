const { default: mongoose } = require("mongoose");

const fornitoreSchema = new mongoose.Schema({
    email : String,
    password: String,
    nomeAttivita: String,
    indirizzoNegozio: String, 
    tipologiaAlimenti: String,
    IBAN: String,
    immagine: String
    //manca coordinate (forse)
});

const Fornitore = mongoose.model('Fornitore',fornitoreSchema );
module.exports = Fornitore;