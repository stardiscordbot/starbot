const {client} = require("../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')
// Arquivos
const bldb = require("../mongodb/blacklist.js");
const dc = require('../mongodb/dc.js')
const pr = require("../mongodb/prefix");
const autorole = require('../mongodb/autorole.js');
const welcomeChannel = require('../mongodb/WelcomeChannel.js');
const votosZuraaa = require('../votosZuraaa.js');
const logChannel = require('../mongodb/messagelog.js');
const Money = require("../mongodb/money.js");
const antilink = require('../mongodb/antilink');
// Inicio do Code
client.on('messageUpdate', async (oldMessage, newMessage) => {
    logChannel.findOne({ GuildID: oldMessage.guild.id }, async (err, data53) => {
    if(!data53) return;
    if(newMessage.author.bot) return;
    let messageChannel2 = client.channels.cache.get(data53.MessageLogChannel)
    if(!messageChannel2) return;
    let messageUpdateEmbed = new Discord.MessageEmbed()
    .setAuthor('Mensagem Editada', 'https://media.discordapp.net/attachments/506838906872922145/603643138854354944/messageupdate.png')
    .setDescription(`**Usuário**\: <@${oldMessage.author.id}>
    **Canal**\: <#${oldMessage.channel.id}>`)
    .addField('Antes\:', `${oldMessage.content}`)
    .addField('Depois\:', `${newMessage.content}`)
    .setColor('YELLOW')
    .setFooter(`ID da mensagem\: ${newMessage.id}`)
    .setTimestamp(newMessage.editedTimestamp)
    messageChannel2.send(messageUpdateEmbed)
    });
  });