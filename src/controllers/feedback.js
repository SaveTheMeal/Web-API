const Feedback = require("../models/feedback");
const Utils = require("../utils");

const getAllFeedback = (req, res, next) => {
  if (req.query.hasOwnProperty("fornitore")) {
    fornitore = req.query.fornitore;
    Feedback.find({ fornitore: fornitore }, (err, data) => {
      if (err || !data) {
        return res.json({
          message: "Feedbacks don't exist from this supplier.",
        });
      } else return res.json(data); //return the meal object if found
    });
  } else {
    Feedback.find({}, (err, data) => {
      if (err) {
        return res.json({ Error: err });
      }
      return res.json(data);
    });
  }
};
const newFeedback = (req, res, next) => {
  //bisogna controllare se l'utente ha fatto acquisti verso quel fornitore e se non esiste già un feedback
  Feedback.findOne({ acquistoID: req.body.acquistoID }, (err, data) => {
    if (data) {
      const newFeedback = new Feedback({
        fornitore: req.body.fornitore,
        acquisto: req.body.acquisto,
        utente: req.body.utente,
        valutazione: req.body.valutazione,
        puntiDiForza: req.body.puntiDiForza,
        commento: req.body.commento,
      });
      newFeedback.save((err, data) => {
        if (err) return res.json({ Error: err });
        return res.json(data);
      });
    } else {
      if (err)
        return res.json(`Something went wrong, please try again. ${err}`);
      return res.json({ message: "There is no purchase with this ID" });
    }
  });
};

module.exports = {
  getAllFeedback,
  newFeedback,
};
