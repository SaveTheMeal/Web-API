const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
const routes3 = require('./routes/utente'); //to import the routes/utente.js
app.use(express.json())
app.use('/', routes);
app.use('/', routes2);
app.use('/', routes3);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

