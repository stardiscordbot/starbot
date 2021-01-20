const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.quote(`${emoji.sim} ${message.author}, https://www.stardcbot.tk/dashboard`)
  message.quote(`${emoji.sim} ${message.author}, https://www.stardcbot.tk/dashboard/${message.guild.id}`)
}

exports.help = {
    "name": "painel",
    "aliases": ["dash", "dashboard"],
    category: 'mod'
}