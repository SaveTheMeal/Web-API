console.log("app started");
require('dotenv').config()
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)

const express=require('express');
const app=express();
app.get("/", function (req, res) {
    req.params

    req.body

res.sendStatus(401);
});
app.listen(3000, () =>
console.log('Demo app listening on port 3000!'),
);