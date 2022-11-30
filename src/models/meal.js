const { default: mongoose } = require("mongoose");

const mealSchema = new mongoose.Schema({
    prezzo: Number, //float
    dimensione: Number, //dimensione
    disponibilità: Boolean,
    codiceID: String

});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;