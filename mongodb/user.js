const mongoose = require("mongoose");

 const schema = mongoose.Schema({
     id: { type: String, required: true },
     sobre: String,
     marry: String,
     votos: String,
     perfil: String
 })
 module.exports = mongoose.model('user', schema)