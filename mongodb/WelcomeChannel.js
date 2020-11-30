const mongoose = require('mongoose');

const welcomeChannelSchema = new mongoose.Schema({
  GuildID: String,
  WelcomeChannelID: String
});

const MessageModel = module.exports = mongoose.model('WelcomeChannel', welcomeChannelSchema);