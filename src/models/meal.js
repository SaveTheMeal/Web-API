const { default: mongoose } = require("mongoose");

const mealSchema = new mongoose.Schema({
    name: {type: String, required: true},
    size: int,
    fasciaOraria: String,
    fornitore: String

});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;