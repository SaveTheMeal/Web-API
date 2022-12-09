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

module.exports = {
    getAllFeedback
};
