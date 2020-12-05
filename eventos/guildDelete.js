const {client} = require("../bot.js");
const config = require("../config.json");
const c = require('colors')
const Discord = require('discord.js')

const removida = new Discord.WebhookClient(config.logID, config.logToken)
client.on("guildDelete", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui removida de um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp()
  .setColor('RANDOM')
  removida.send(embed);
});