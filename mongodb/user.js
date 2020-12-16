const mongoose = require("mongoose");

 const schema = mongoose.Schema({
     id: { type: String, required: true },
     sobre: String,
     marry: String,
     votos: String
 })
 module.exports = mongoose.model('mod', schema)