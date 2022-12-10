const Acquisto = require('../models/acquisto');

const getAllAcquisto = (req, res, next) => {
    if (req.query.utente) {
        const filters = req.query;
        for (key in filters) {
            Acquisto.find({ utente: filters[key] }, (err, data) => {
                if (err || !data) {
                    return res.json({ message: "Purchase don't exist from this user." });
                }
                else return res.json(data); //return the meal object if found
            })
        }
    }
    else {
        Acquisto.find({}, (err, data) => {
            if (err) {
                return res.json({ Error: err });
            }
            return res.json(data);
        })
    }
};
const newAcquisto = (req, res, next) => {
    //check if the meal ID already exists in db
    Acquisto.findOne({ codiceID: req.body.codiceID }, (err, data) => {
        //if meal not in db, add it

        if (!data) {
            //create a new meal object using the meal model and req.body
            const newAcquisto = new Acquisto({
                meal: req.body.meal,
                acquirente: req.body.acquirente,
                presenzaIntolleranze: req.body.presenzaIntolleranze,
                intolleranze: req.body.intolleranze,
                isPaid: req.body.isPaid,
                borsa: req.body.borsa,
                stato: req.body.stato,
                codiceID: req.body.codiceID
            })
            // save this object to database
            newAcquisto.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })
            //if there's an error or the meal is in db, return a message
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "purchase already exists" });
        }
    })
};
const getOneAcquisto = (req, res, next) => {
    let codiceID = req.params['codiceID']; //get the meal ID
    //find the specific meal with that ID
    Acquisto.findOne({ codiceID: codiceID }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Acquisto doesn't exist." });
        }
        else return res.json(data); //return the meal object if found
    });
};

module.exports = {
    getAllAcquisto,
    newAcquisto,
    getOneAcquisto
};