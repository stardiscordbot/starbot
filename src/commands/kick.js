const Discord = require('discord.js')
const emoji = require('../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.quote(`${emoji.nao} ${message.author}, você não tem permissão para usar este comando.`)
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.quote(`${emoji.nao} ${message.author}, eu não tenho permissão para executar este comando`)
    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, eu preciso do \`ID/Menção\` do usuário`)
    const id = args[0]
    const motivo = args.splice(1).join(" ")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!motivo) motivo = 'Não Definido'
    member.kick({
        reason: `Punido por: ${message.author.tag} - Motivo; ${motivo}`
    })
}
exports.help = {
    name: 'kick',
    aliases: ['expulsar']
}