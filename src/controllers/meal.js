console.log("controller");
const Meal = require('../models/meal');

//GET '/meal'
const getAllMeal = (req, res, next) => {
    res.json({ message: "GET all meal" });
};
//POST '/meal'
const newMeal = (req, res, next) => {
    //check if the meal name already exists in db
    Meal.findOne({ codiceID: req.body.codiceID }, (err, data) => {
        //if meal not in db, add it
        if (!data) {
            //create a new meal object using the meal model and req.body
            const newMeal = new Meal({
                prezzo: req.body.prezzo,
                dimensione: req.body.dimensone,
                disponibilità: req.body.disponibilità,
                codiceID: req.body.codiceID,
            })
            // save this object to database
            newMeal.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })
            //if there's an error or the meal is in db, return a message
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "meal already exists" });
        }
    })
};
//DELETE '/meal'
const deleteAllMeal = (req, res, next) => {
    res.json({ message: "DELETE all meal" });
};
//GET '/meal/:name'
const getOneMeal = (req, res, next) => {
    res.json({ message: "GET 1 meal" });
};
//DELETE '/meal/:name'
const deleteOneMeal = (req, res, next) => {
    res.json({ message: "DELETE 1 meal" });
};
//export controller functions
module.exports = {
    getAllMeal,
    newMeal,
    deleteAllMeal,
    getOneMeal,
    deleteOneMeal
}; //per poterlo utilizzare in altri file