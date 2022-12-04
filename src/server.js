const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();



//establish connection to database
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const routes = require('./routes/meal'); //to import the routes/meal.js
const routes2 = require('./routes/fornitore'); //to import the routes/fornitore.js
app.use(express.json())
app.use('/', routes);
app.use('/', routes2);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

