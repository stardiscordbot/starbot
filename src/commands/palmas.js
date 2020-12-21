const Discord = require('discord.js')
const emoji = require('../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    if(!args.join(" ")) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você escreva algo após o comando \`${prefix}palmas <texto bacana>\``)
    message.quote(`${emoji.sim} ${message.author}, aqui está seu texto:\n> ${args.join(" ").toString().replace(/ /gi, " 👏 ")}`)
}
exports.help = {
    "name": "palmas",
    "aliases": ["clap", "palm"]
}