const express = require('express'); //import express

const router = express.Router();

const mealController = require('../controllers/meal');

router.post('/meal', mealController.newMeal);

module.exports = router; //export to use in server.js