const { default: mongoose } = require("mongoose");
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
    Acquisto.aggregate([
      {
        $lookup: {
          from: "meals",
          localField: "meal",
          foreignField: "_id",
          as: "mealData",
        },
      },
      {
        $unwind: {
          path: "$mealData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match:{
        $and: [
          { acquirente: mongoose.Types.ObjectId(feedback.utente) },
          { 'mealData.fornitore': mongoose.Types.ObjectId(feedback.fornitore) }
        ]
      }  },
    ]).exec(function (err, data) {
      if (data.length>0){
        Feedback.findOne({ utente: feedback.utente, fornitore: feedback.fornitore }, (err, data) => {
          if (!data) {
            const newFeedback = new Feedback({
              fornitore: feedback.fornitore,
              utente: feedback.utente,
              valutazione: feedback.valutazione,
              puntiDiForza: feedback.puntiDiForza,
              commento: feedback.commento,
            });
            newFeedback.save((err, data) => {
              if (err) return res.json({ Error: err });
              return res.json(data);
            });
          } else {
            if (err)
              return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "You've already make a feedback for this store" });
          }
        });
      }else{
        return res.json({ message: "You can't make a feedback before buying from the store" });
      }
      /*
      disponibile = true;
      for (let i = 0; i < data.length; i++) {
        let meal = data[i];
        if (
          meal.disponibilita == false ||
          (meal.hasOwnProperty("acquisto") &&
            meal.acquisto.stato != "rifiutato")
        ) {
          disponibile = false;
        }
      }
      if (disponibile) {
        //create a new acquisto object using the acquisto model and req.body
        const newAcquisto = new Acquisto({
          meal: acquisto.meal,
          acquirente: acquisto.acquirente,
          presenzaIntolleranze: acquisto.presenzaIntolleranze,
          intolleranze: acquisto.intolleranze,
          isPaid: acquisto.isPaid,
          borsa: acquisto.borsa,
          stato: acquisto.stato,
        });
        // save this object to database
        newAcquisto.save((err, data) => {
          if (err) return res.json({ Error: err });
          return res.json(data);
        });
        
      } else {
        return res.json({ message: "The meal isn't available" });
      }*/
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
