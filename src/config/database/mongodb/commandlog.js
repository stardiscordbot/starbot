const mongoose = require('mongoose')
let Schema = new mongoose.Schema({
    guild: String,
    cmd: String,
    date: String,
    region: String,
})
module.exports = mongoose.model("commandlog", Schema)