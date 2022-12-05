const { default: mongoose } = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    valutazione: Number,
    puntiDiForza: String, 
    commento: String,
    fornitore : String,
    utente: String
});

const Feedback = mongoose.model('Feedback',feedbackSchema );
module.exports = Feedback;