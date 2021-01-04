const {client} = require("../../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')
// Arquivos
const bldb = require("../mongodb/blacklist.js");
const dc = require('../mongodb/dc.js')
const pr = require("../mongodb/prefix");
const autorole = require('../mongodb/autorole.js');
const welcomeChannel = require('../mongodb/WelcomeChannel.js');
const logChannel = require('../mongodb/messagelog.js');
const Money = require("../mongodb/money.js");
const antilink = require('../mongodb/antilink');
const Levels = require('discord-xp')
const emoji = require('../jsons/emojis.json')
// Inicio do Code
Levels.setURL(config.mongo);
// Evento
client.on("message", async message => {
    if (!message.guild) return;
    if (message.author.bot) return;
    
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.quote(`${emoji.alerta} ${message.author}, Parabéns! Você passou para o nível \`${user.level}\`. :tada:`);
    }
})