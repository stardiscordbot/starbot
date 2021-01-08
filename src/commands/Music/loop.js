const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const {channel} = message.member.voice;

    if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)
    
    let loop = client.player.togleLoop(message.guild.id)
    
    if(loop) {
        message.quote(`${emoji.sim} ${message.author}, Irei repetir a musica atual`)
    } else {
        message.quote(`${emoji.sim} ${message.author}, Não irei mais repetir a musica atual`)
    }
}
exports.help = {
    name: 'loop',
    aliases: ['repeat'],
    category: 'music',
    status: 'on'
}