const mongoose = require("mongoose");

 const schema = mongoose.Schema({
     nome: String,
     quantidade: Number,
 })
 
 module.exports = mongoose.model('comandos', schema)