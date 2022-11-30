const express = require('express');//import express
const multer = require('multer');
const upload = multer(); 

const router = express.Router();

const mealController = require('../controllers/meal');

router.post('/meal',upload.none(), mealController.newMeal);
router.get('/meal', mealController.getAllMeal);
router.delete('/meal', mealController.deleteAllMeal);

router.get('/tea/:codiceID', mealController.getOneMeal);
router.delete('/meal/:codiceID', mealController.deleteOneMeal);


module.exports = router; //export to use in server.js