const express = require('express');//import express
const mealController = require('../controllers/meal');
const router = express.Router();



router.post('/meal', mealController.newMeal);
router.get('/meal', mealController.getAllMeal);
router.delete('/meal', mealController.deleteAllMeal);

router.get('/meal/:codiceID', mealController.getOneMeal);
router.delete('/meal/:codiceID', mealController.deleteOneMeal);


module.exports = router; //export to use in server.js