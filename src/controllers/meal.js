const Meal = require("../models/meal");

//GET '/meal'
const getAllMeal = (req, res, next) => {
  if (req.query.hasOwnProperty("fornitore")) {
    fornitore = req.query.fornitore;
    Meal.find({ fornitore: fornitore }, (err, data) => {
      if (err || !data) {
        return res.json({ message: "Meals don't exist from this supplier." });
      } else return res.json(data); //return the meal object if found
    });
  } else {
    Meal.find({}, (err, data) => {
      if (err) {
        return res.json({ Error: err });
      }
      return res.json(data);
    });
  }
};
//POST '/meal'
const newMeal = (req, res, next) => {
  meal = req.body;
  if (
    meal.hasOwnProperty("fornitore") &&
    meal.hasOwnProperty("prezzo") &&
    meal.hasOwnProperty("dimensione") &&
    meal.hasOwnProperty("disponibilita")
  ) {
    //create a new meal object using the meal model and req.body
    const nuovoMeal = new Meal({
      fornitore: meal.fornitore,
      prezzo: meal.prezzo,
      dimensione: meal.dimensione,
      disponibilita: meal.disponibilita,
    });
    // save this object to database
    nuovoMeal.save((err, data) => {
      if (err) return res.json({ Error: err });
      return res.json(data);
    });
  } else {
    return res.json({ message: "Meal object required" });
  }
};
//DELETE '/meal'
const deleteAllMeal = (req, res, next) => {
  Meal.deleteMany({}, (err) => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  });
};
//GET '/meal/:codice'
const getOneMeal = (req, res, next) => {
  id = req.params["id"]; //get the meal ID
  //find the specific meal with that ID
  Meal.findOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Meal doesn't exist." });
    } else return res.json(data); //return the meal object if found
  });
};
//DELETE '/meal/:codice'
const deleteOneMeal = (req, res, next) => {
  id = req.params["id"];
  Meal.findOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Meal doesn't exist." });
    } else
      Meal.deleteOne({ _id: id }, (err) => {
        if (err) {
          return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
      });
  });
};
//export controller functions
module.exports = {
  getAllMeal,
  newMeal,
  deleteAllMeal,
  getOneMeal,
  deleteOneMeal,
}; //per poterlo utilizzare in altri file
