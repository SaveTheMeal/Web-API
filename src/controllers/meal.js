const Meal = require('../models/meal');

//GET '/meal'
const getAllMeal = (req, res, next) => {
    Meal.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};
//POST '/meal'
const newMeal = (req, res, next) => {
    //check if the meal ID already exists in db
    Meal.findOne({ codiceID: req.body.codiceID }, (err, data) => {
        //if meal not in db, add it

        if (!data) {
            //create a new meal object using the meal model and req.body
            const newMeal = new Meal({
                prezzo: req.body.prezzo,
                dimensione: req.body.dimensione,
                disponibilita: req.body.disponibilita,
                codiceID: req.body.codiceID,
                nome: req.body.nome,
                fornitore: req.body.fornitore
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
    Meal.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
    })
};
//GET '/meal/:codice'
const getOneMeal = (req, res, next) => {
    let codiceID = req.params['codiceID']; //get the meal ID
    //find the specific meal with that ID
    Meal.findOne({ codiceID: codiceID }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Meal doesn't exist." });
        }
        else return res.json(data); //return the meal object if found
    });
};
//DELETE '/meal/:codice'
const deleteOneMeal = (req, res, next) => {
    let codiceID = req.params['codiceID'];
    Meal.findOne({ codiceID: codiceID }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Meal doesn't exist." });
        }
        else Meal.deleteOne({codiceID: codiceID}, err => {
            if (err) {
                return res.json({ message: "Complete delete failed" });
            }
            return res.json({ message: "Complete delete successful" });
        })

    });

};
//export controller functions
module.exports = {
    getAllMeal,
    newMeal,
    deleteAllMeal,
    getOneMeal,
    deleteOneMeal
}; //per poterlo utilizzare in altri file