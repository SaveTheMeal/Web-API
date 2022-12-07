const { default: mongoose } = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  fornitore: String,
  utente: String,
  valutazione: Number,
  puntiDiForza: String,
  commento: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
