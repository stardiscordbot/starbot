const Discord = require('discord.js')
const mongoose = require('mongoose')
const logChannel = require('../../mongodb/messagelog.js')

module.exports.run = async (bot, message, args) => {
  let channel = message.mentions.channels.first() || bot.channels.cache.get(args[0])
  let argsEmbed = new Discord.MessageEmbed()
  .setTitle('Canal invalido')
  .setDescription(`Mencione um canal!`)
  .addField('Examplo:', '\`s!messagelog #canal \`')
  .setColor('RED')

  if(!message.member.hasPermission("MANAGE_GUILD")) {
  return message.quote("Você não tem permissão para usar este comando")
  }

  if(!channel) {
  return message.quote(argsEmbed)
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
    message.quote(embed)
    } else {
    let existsembed = new Discord.MessageEmbed()
    .setTitle('Log Existente')
    .setDescription('Já existe um canal de logs neste servidor, use \`s!reset\` para mudar de canal!')
    .setColor('RED')
    message.quote(existsembed)
    }
  })
}
exports.help = {
    name: 'messagelog',
    aliases: ['auditoria']
}