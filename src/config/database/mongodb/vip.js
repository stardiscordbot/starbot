const mongoose = require('mongoose')
let Schema = new mongoose.Schema({
    User: String,
    Vip: String,
    Time: Number,
})
module.exports = mongoose.model("vips", Schema)