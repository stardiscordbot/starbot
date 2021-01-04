const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    welcomeChannel: String,
    log: String,
    prefix: String,
    lang: String,
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');