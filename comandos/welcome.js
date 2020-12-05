const Discord = require('discord.js')
const { on } = require('jimp')
const config = require('../config.json')
const mongoose = require('mongoose')
const welcomeChannel = require('../mongodb/WelcomeChannel.js')

module.exports.run = async (client, message, args) => {
  let channel = message.mentions.channels.first() || client.channels.cache.get(args[0])

  if(!message.member.hasPermission('ADMINISTRATOR')) {
    return message.quote('Você não tem a permissão de \`admininstrador\` para usar este comando')
  }

  if(!channel) {
    return message.quote('Você não especificou um canal!')
  }

  welcomeChannel.findOne({ GuildID: message.guild.id }, async (err, data) => {
    if(!data) {
      let newSettings = new welcomeChannel({
        GuildID: message.guild.id,
        WelcomeChannelID: channel.id
      })
      let embed = new Discord.MessageEmbed()
      .setTitle('<:welcomee:767818105292062801> Mensagem de Boas Vindas')
      .setDescription(`Quando um usuário entrar no servidor anunciarei no canal ${channel.toString()}.`)
      .setColor(config.color)
      message.quote(embed)
      newSettings.save()
    } else {
      let existsembed = new Discord.MessageEmbed()
      .setTitle('<:welcomee:767818105292062801> Mensagem de Boas Vindas Existente')
      .setDescription('Use o comando \`s!reset\` para resetar esta configuração!')
      .setColor(config.color)
      message.quote(existsembed)
    }
  })
}

exports.help = {
  name: "welcomechannel",
  aliases: ['joinchannel'],
  status: 'on'
}