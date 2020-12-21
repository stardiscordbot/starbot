const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    welcomeID: String,
    welcomeSwitch: Boolean,
    welcomeGif: Boolean,
    customPrefix: String,
    musicChannel: String,
    lang: String,
    
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');