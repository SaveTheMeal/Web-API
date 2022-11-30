const { default: mongoose } = require("mongoose");

const indirizzoSchema = new mongoose.Schema({
    via: String,
    numeCivico: int,
    cap: int,
    città: String,
    provincia: String,
    xy: int //coordinata

});

const Indirizzo = mongoose.model('Indirizzo', indirizzoSchema);
module.exports = Indirizzo;