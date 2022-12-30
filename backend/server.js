const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("static"));
/**
 * CORS requests
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//establish connection to database
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

const routes = require("./routes/meal"); //to import the routes/meal.js
const routes2 = require("./routes/fornitore"); //to import the routes/fornitore.js
const routes3 = require("./routes/utente");
const routes4 = require("./routes/feedback");
const routes5 = require("./routes/acquisto");
app.use(express.json());
app.use("/", routes);
app.use("/", routes2);
app.use("/", routes3);
app.use("/", routes4);
app.use("/", routes5);

app.use(express.static("frontend"));

app.use((req, res) => {
  res.status(404);
  res.json({ error: "Not found" });
});

const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});