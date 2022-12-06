const Utente = require('../models/utente'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


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

//export controller functions
module.exports = {
    login
}; //per poterlo utilizzare in altri file