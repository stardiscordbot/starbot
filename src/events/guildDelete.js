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
// Inicio do Code
const removida = new Discord.WebhookClient(config.logID, config.logToken)
client.on("guildDelete", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui removida de um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp()
  .setColor('YELLOW')
  removida.send(embed);
});