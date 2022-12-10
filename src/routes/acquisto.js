const express = require('express');//import express
const acquistoController = require('../controllers/acquisto');
const router5 = express.Router();

router5.post('/acquisto', acquistoController.newAcquisto);
router5.get('/acquisto', acquistoController.getAllAcquisto);
router5.get('/acquisto/:codiceID', acquistoController.getOneAcquisto);

module.exports = router5;