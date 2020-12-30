const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const logChannel = require('../../mongodb/messagelog.js')
const welcomeChannel = require('../../mongodb/WelcomeChannel.js')
const autorole = require('../../mongodb/autorole.js')
const embed = new MessageEmbed()
exports.run = async (client, message, args) => {

    embed.setTitle(`Painel | ${client.user.username}`)
    embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048}))
    embed.setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    embed.setColor(config.color)
    // Coisas
    // MessageLog
    logChannel.findOne({GuildID:message.guild.id}, async (err, a) => {
        if(a) {
          await embed.addField('<:on:788102404146331678> MessageLog', `\`As logs de Mensagem estão ativas nesse servidor\` | <#${a.MessageLogChannel}>`)
        } else {
          await embed.addField('<:off:788102362132250715> MessageLog', `\`As logs de Mensagem estão desativadas nesse servidor\``)
        }
    })
    // Autorole
    autorole.findOne({GuildID:message.guild.id}, async (err, a) => {
      if(a) {
        await embed.addField('<:on:788102404146331678> Autorole', `\`O Autorole está ativo nesse servidor\` | <@&${a.RoleID}>`)
      } else {
        await embed.addField('<:off:788102362132250715> Autorole', `\`O Autorole está desativado nesse servidor\``)
      }
  })
  // Welcome
  welcomeChannel.findOne({GuildID:message.guild.id}, async (err, a) => {
    if(a) {
      await embed.addField('<:on:788102404146331678> Welcome', `\`O Welcome está ativo nesse servidor\` | <@#${a.WelcomeChannelID}>`)
    } else {
      await embed.addField('<:off:788102362132250715> Welcome', `\`O Welcome está desativado nesse servidor\``)
    }
})
    await message.quote({embed})
}
exports.help = {
    "name": "painel",
    "aliases": ["dash", "dashboard"],
    category: 'mod'
}