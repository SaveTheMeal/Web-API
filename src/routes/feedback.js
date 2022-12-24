const express = require("express"); //import express
const feedbackController = require("../controllers/feedback");
const tokenCheckerFornitore = require("../controllers/tokenCheckerFornitore");
const router4 = express.Router();

router4.get("/feedback", feedbackController.getAllFeedback);
router4.post("/feedback", tokenCheckerFornitore);
router4.post("/feedback", feedbackController.newFeedback);

module.exports = router4;
