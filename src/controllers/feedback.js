const Feedback = require('../models/feedback');
const Utils= require('../utils');

const getAllFeedback = (req, res, next) => {
    if (req.query.fornitore) {
        const filters = req.query;
        for (key in filters) {
        Feedback.find({ fornitore: filters[key] }, (err, data) => {
            if (err || !data) {
                return res.json({ message: "Feedbacks don't exist from this supplier." });
            }
            else return res.json(data); //return the feedback object if found
        })
        } 
    }
        else {
        Feedback.find({}, (err, data) => {
            if (err) {
                return res.json({ Error: err });
            }
            return res.json(data);
        })
    }
};
const newFeedback = (req, res, next) => {
    //per tutti gli acquisti bisogna controllare che ce ne sia uno con questo ID altrimenti la recensione non può essere scritta
    Feedback.findOne({ acquistoID: req.body.acquistoID }, (err, data) => {
        if (data) {
            const newFeedback = new Feedback({
                fornitore: req.body.fornitore,
                acquisto: req.body.acquisto,
                utente: req.body.utente,
                valutazione: req.body.valutazione,
                puntiDiForza: req.body.puntiDiForza,
                commento: req.body.commento
            })
            newFeedback.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "There is no purchase with this ID" });
        }
    })
};

module.exports = {
    getAllFeedback,
    newFeedback
};
