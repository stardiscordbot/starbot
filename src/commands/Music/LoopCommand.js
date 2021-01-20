const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {

    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, Você precisa selecionar uma opção: \`${prefix}loop <enable/disable>\``)

    if(args[0] == 'enable') {

        const {channel} = message.member.voice;

        if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)
    
        client.player.setRepeatMode(message, true)

        message.quote(`${emoji.sim} ${message.author}, Irei repetir a música atual!`)
    }

    if(args[0] == 'disable') {
    
        client.player.setRepeatMode(message, false)

        message.quote(`${emoji.nao} ${message.author}, Não irei mais repetir a música atual!`)
    }

}
exports.help = {
    name: 'loop',
    aliases: ['repeat'],
    category: 'music',
    status: 'on'
}