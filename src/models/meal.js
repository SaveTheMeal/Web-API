const { default: mongoose } = require("mongoose");

const mealSchema = new mongoose.Schema({
    prezzo: Number, //float
    dimensione: String, //dimensione
    disponibilita: Boolean,
    codiceID: Number,
    nome: String,
    fornitore: String
    //manca data e fascia oraria
    
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;