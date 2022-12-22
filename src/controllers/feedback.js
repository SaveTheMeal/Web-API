const Feedback = require("../models/feedback");
const Meal = require("../models/meal");
const Acquisto = require("../models/acquisto");
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
  feedback = req.body;
  if (
    feedback.hasOwnProperty("fornitore") &&
    feedback.hasOwnProperty("utente") &&
    feedback.hasOwnProperty("valutazione") &&
    feedback.hasOwnProperty("puntiDiForza") &&
    feedback.hasOwnProperty("commento")
  ) {
    Acquisto.aggregate([{
      $lookup: {
          from: "meals", // collection name in db
          localField: "meal",
          foreignField: "codiceID",
          as: "AcquistoConMeal"
      }
  }]).exec(function(err, data) {
      console.log(data);
  });
    Acquisto.find({ acquirente: feedback.utente }, (err, data) => {
      if (data) {
        //Controlliamo se i meal di questi acquisti fanno parte del fornitore del feedback
        console.log(data);
      } else {
        if (err)
          return res.json(`Something went wrong, please try again. ${err}`);
        return res.json({ message: "L'utente non ha fatto acquisti" });
      }
    });
    //bisogna controllare se l'utente ha fatto acquisti verso quel fornitore e se non esiste già un feedback
    /*Feedback.findOne({ acquistoID: req.body.acquistoID }, (err, data) => {
      if (data) {
        const newFeedback = new Feedback({
          fornitore: req.body.fornitore,
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
    });*/
  } else {
    return res.json({ message: "Feedback object required" });
  }
};

module.exports = {
  getAllFeedback,
  newFeedback,
};
