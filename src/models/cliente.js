const { default: mongoose } = require("mongoose");

const clienteSchema = new mongoose.Schema({
    email : String,
    password: String,
});

const Cliente = mongoose.model('Cliente',clienteSchema );
module.exports = Cliente;