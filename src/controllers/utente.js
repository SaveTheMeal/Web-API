const Utente = require('../models/utente'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Utils= require('../utils');


// ---------------------------------------------------------
// route to authenticate and get a new token
// --------------------------------------------------------
//GET '/utente'
const login = async function (req, res, next) {
    // find the user
	let user = await Utente.findOne({
		email: req.body.email
	}).exec();

	// user not found
	if (!user) {
		console.log("UTENTE NON TROVATO");
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}

	// check if password matches
	if (user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	}

	// if user is found and password is right create a token
	var payload = {
		email: user.email,
        nome: user.nome,
        cognome: user.cognome
		// other data encrypted in the token	
	}
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		email: user.email,
		nome: user.nome,
        cognome: user.cognome,
		//self: "api/v1/" + user._id
	});
};
const newUtente = (req, res, next) => {
	if (!req.body.email || typeof req.body.email != 'string' || !Utils.checkIfEmailInString(req.body.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }
    //check if the Utente name already exists in db
    Utente.findOne({ email: req.body.email }, (err, data) => {

        //if Utente not in db, add it

        if (!data) {

            //create a new Utente object using the Utente model and req.body
            const newUtente = new Utente({
                email: req.body.email,
                password: req.body.password,
                nome: req.body.nome,
                cognome: req.body.cognome
            })
            // save this object to database
            newUtente.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })
            //if there's an error or the Utente is in db, return a message
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "User already exists" });
        }
    })
};
const getAllUtente = (req, res, next) => {
    Utente.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//export controller functions
module.exports = {
    login,
	newUtente,
	getAllUtente
}; //per poterlo utilizzare in altri file