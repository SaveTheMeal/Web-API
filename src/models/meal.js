const { default: mongoose } = require("mongoose");

const mealSchema = new mongoose.Schema({
    codiceID: Number,
    fornitore: String,
    prezzo: Number, //float
    dimensione: String, //dimensione
    disponibilita: Boolean,
    //manca data e fascia oraria
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;