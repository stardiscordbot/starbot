const { client } = require("../bot.js");
const config = require("../config.json");
const c = require('colors')
const logChannel = require('../mongodb/messagelog')

client.on('messageDelete', async (message) => {
    logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
    if(!data12) return;
    if(message.author.bot) return;
    let messageChannel = client.channels.cache.get(data12.MessageLogChannel)
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