const { default: mongoose } = require("mongoose");

const acquistoSchema = new mongoose.Schema({
  meal: String,
  acquirente: String,
  presenzaIntolleranze: Boolean,
  intolleranze: String,
  isPaid: Boolean,
  borsa: Boolean,
  stato: String,
  codiceID: String,
});

const Acquisto = mongoose.model("Acquisto", acquistoSchema);
module.exports = Acquisto;
