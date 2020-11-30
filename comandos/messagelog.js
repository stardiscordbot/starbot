const Discord = require('discord.js')
const mongoose = require('mongoose')
const logChannel = require('../mongodb/messagelog.js')

module.exports.run = async (bot, message, args) => {
  let channel = message.mentions.channels.first() || bot.channels.cache.get(args[0])
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Canal invalido')
  .setDescription(`Mencione um canal!`)
  .addField('Examplo:', '\`s!messagelog #canal \`')
  .setColor('RED')

  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send("Você não tem permissão para usar este comando")
  }

  if(!channel) {
  return message.channel.send(argsEmbed)
  }

  logChannel.findOne({ GuildID: message.guild.id},async(err, data) => {
  if(err) console.log(err)
  if(!data) {
  let newSettings = new logChannel({
      GuildID: message.guild.id,
      MessageLogChannel: channel.id
      })
    let embed = new Discord.MessageEmbed()
  .setTitle('Log Criada!')
  .setDescription(`As logs de mensagem vão ser enviadas para o canal <#${channel.id}>.`)
  .setColor('GREEN')
      newSettings.save()
    message.channel.send(embed)
    } else {
    let existsembed = new Discord.MessageEmbed()
    .setTitle('Log Existente')
    .setDescription('Já existe um canal de logs neste servidor, use \`s!reset\` para mudar de canal!')
    .setColor('RED')
    message.channel.send(existsembed)
    }
  })
}
exports.help = {
    name: 'messagelog',
    aliases: ['auditoria']
}