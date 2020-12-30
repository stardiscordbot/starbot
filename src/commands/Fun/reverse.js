const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    if(!args.join(" ")) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você escreva algo após o comando \`${prefix}reverse <texto bacana>\``)
    message.quote(`${emoji.sim} ${message.author}, aqui está seu texto:\n> ${args.join(" ").split('').reverse().join('')}`)
}
exports.help = {
    "name": "reverse",
    "aliases": ["reverter"]
}