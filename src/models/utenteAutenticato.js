const { default: mongoose } = require("mongoose");

const utenteSchema = new mongoose.Schema({
    email : String,
    password: String,
});

const UtenteAutenticato = mongoose.model('UtenteAutenticato',utenteSchema );
module.exports = Fornitore;