const Fornitore = require("../models/fornitore");
const Utils = require("../utils");

//GET '/fornitore'
const getAllFornitore = (req, res, next) => {
  Fornitore.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};
//POST '/Fornitore'
const newFornitore = (req, res, next) => {
  fornitore = req.body;
  if (
    fornitore.hasOwnProperty("nomeAttivita") &&
    fornitore.hasOwnProperty("indirizzoNegozio") &&
    fornitore.hasOwnProperty("tipologiaAlimenti") &&
    fornitore.hasOwnProperty("email") &&
    fornitore.hasOwnProperty("password") &&
    fornitore.hasOwnProperty("IBAN")
  ) {
    if (
      typeof fornitore.email != "string" ||
      !Utils.checkIfEmailInString(fornitore.email)
    ) {
      res.status(400).json({
        error: 'The field "email" must be a non-empty string, in email format',
      });
      return;
    } else {
      //check if the Fornitore name already exists in db
      Fornitore.findOne(
        {
          $or: [
            { nomeAttivita: fornitore.nomeAttivita },
            { email: fornitore.email },
          ],
        },
        (err, data) => {
          //if fornitore not in db, add it

          if (!data) {
            //create a new fornitore object using the fornitore model and req.body
            const nuovoFornitore = new Fornitore({
              nomeAttivita: fornitore.nomeAttivita,
              indirizzoNegozio: fornitore.indirizzoNegozio,
              tipologiaAlimenti: fornitore.tipologiaAlimenti,
              email: fornitore.email,
              password: fornitore.password,
              IBAN: fornitore.IBAN,
            });
            // save this object to database
            nuovoFornitore.save((err, data) => {
              if (err) return res.json({ Error: err });
              return res.json(data);
            });
            //if there's an error or the fornitore is in db, return a message
          } else {
            if (err)
              return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "Fornitore already exists" });
          }
        }
      );
    }
  } else {
    return res.json({ message: "Fornitore object required" });
  }
};
//DELETE '/fornitore'
const deleteAllFornitore = (req, res, next) => {
  Fornitore.deleteMany({}, (err) => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  });
};
//GET '/fornitore/:email'
const getOneFornitore = (req, res, next) => {
  email = req.params["email"]; //get the fornitore email
  //find the specific fornitore with that email
  Fornitore.findOne({ email: email }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Fornitore doesn't exist." });
    } else return res.json(data); //return the fornitore object if found
  });
};
//DELETE '/fornitore/:email'
const deleteOneFornitore = (req, res, next) => {
  email = req.params["email"];
  Fornitore.findOne({ email: email }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Fornitore doesn't exist." });
    } else
      Fornitore.deleteOne({ email: email }, (err) => {
        if (err) {
          return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
      });
  });
};
//export controller functions
module.exports = {
  getAllFornitore,
  newFornitore,
  deleteAllFornitore,
  getOneFornitore,
  deleteOneFornitore,
}; //per poterlo utilizzare in altri file
