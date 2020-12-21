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
client.on('messageDelete', async (message) => {
    if (messageDelete.channel.type === "dm") return;
    logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
    if(!data12) return;
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;
    let messageChannel = client.channels.cache.get(data12.MessageLogChannel)
    if(!messageChannel) return console.log('[CANAL] - Canal de logs inexistente :)'.america)
    let messageDeleteEmbed = new Discord.MessageEmbed()
    .setAuthor('Mensagem Deletada', 'https://media.discordapp.net/attachments/506838906872922145/603642595419357190/messagedelete.png')
    .setDescription(`**Usuário**\: <@${message.author.id}>
    **Canal**\: <#${message.channel.id}>
    ${message.content}`)
    .setColor('RED')
    .setFooter(`ID da mensagem\: ${message.id}`)
    .setTimestamp()
    messageChannel.send(messageDeleteEmbed)
    });
  });