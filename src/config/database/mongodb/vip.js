const mongoose = require('mongoose')
let Schema = new mongoose.Schema({
    user: String,
    vip: String,
    date: String,
})
module.exports = mongoose.model("vips", Schema)