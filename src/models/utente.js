const { default: mongoose } = require("mongoose");

const utenteSchema = new mongoose.Schema({
  email: String,
  password: String,
  nome: String,
  cognome: String,
});

const Utente = mongoose.model("Utente", utenteSchema);
module.exports = Utente;
