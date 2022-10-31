console.log("controller");

// newMeal function for post meal route
const newMeal = (req, res, next) => {
    console.log("eccomi");
    res.json({message: "POST new meal"}); // dummy function for now
    };

    module.exports = {newMeal}; //per poterlo utilizzare in altri file