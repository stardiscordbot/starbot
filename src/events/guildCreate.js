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
const adicionada = new Discord.WebhookClient(config.logID, config.logToken)
client.on("guildCreate", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui adicionada em um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(client.user.displayAvatarURL())
  .setTimestamp()
  .setColor('YELLOW')
  adicionada.send(embed);
  guild.owner.send(`Olá, ${guild.owner}\n\nNão sei se foi você ou outra pessoa que me adicionou no servidor **${guild.name}**, mas já que você é o dono eu acho que seria uma boa ideia falar um pouco sobre mim.\n\nEu me chamo **Star:tm:** e sou apenas um simples bot para o Discord! Meu objetivo é deixar o seu servidor mais divertido ??\n\nSe precisar de ajuda ou tenha alguma duvida, entre no meu servidor de suporte: https://discord.gg/Gq2kssT`)
})