const { default: mongoose } = require("mongoose");
const Indirizzo = require("indirizzo");

const fornitoreSchema = new mongoose.Schema({
    nomeAttività: String,
    indirizzoNegozio: Indirizzo, //creare tipo indirizzo
    tipologiaAlimenti: String,
    email : String,
    password: String,
    IBAN: String
    //manca l'immagine che non so come metterla
});

const Fornitore = mongoose.model('Fornitore',fornitoreSchema );
module.exports = Fornitore;