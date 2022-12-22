const Acquisto = require("../models/acquisto");

const getAllAcquisto = (req, res, next) => {
  if (req.query.hasOwnProperty("utente")) {
    utente = req.query.utente;
    Acquisto.find({ utente: utente }, (err, data) => {
      if (err || !data) {
        return res.json({
          message: "Purchase don't exist from this user.",
        });
      } else return res.json(data); //return the meal object if found
    });
  } else {
    Acquisto.find({}, (err, data) => {
      if (err) {
        return res.json({ Error: err });
      }
      return res.json(data);
    });
  }
};
const newAcquisto = (req, res, next) => {
  acquisto = req.body;
  if (
    acquisto.hasOwnProperty("meal") &&
    acquisto.hasOwnProperty("acquirente") &&
    acquisto.hasOwnProperty("presenzaIntolleranze") &&
    acquisto.hasOwnProperty("intolleranze") &&
    acquisto.hasOwnProperty("isPaid") &&
    acquisto.hasOwnProperty("borsa") &&
    acquisto.hasOwnProperty("stato")
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
    ]).exec(function (err, data) {
      console.log(data);
      res.json(data);
      console.log(data.mealData);
      res.json(data.MealData);
    });
    /*
    //check if the meal ID already exists in db
    Acquisto.findOne({ meal: acquisto.meal }, (err, data) => {
      //if acquisto not in db, add it
      if (!data) {
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
        //if there's an error or the meal is in db, return a message
      } else {
        if (err)
          return res.json(`Something went wrong, please try again. ${err}`);
        return res.json({ message: "purchase already exists" });
      }
    });*/
  } else {
    return res.json({ message: "Acquisto object required" });
  }
};
const getOneAcquisto = (req, res, next) => {
  codiceID = req.params["codiceID"]; //get the meal ID
  //find the specific meal with that ID
  Acquisto.findOne({ meal: codiceID }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Acquisto doesn't exist." });
    } else return res.json(data); //return the acquisto object if found
  });
};

module.exports = {
  getAllAcquisto,
  newAcquisto,
  getOneAcquisto,
};
