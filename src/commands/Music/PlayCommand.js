const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    
    const { channel } = message.member.voice;

    if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)

    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, Eu preciso que você me especifique uma musica`)
    
    client.player.play(message, args[0]);
    
}
exports.help = {
    name: 'play',
    aliases: ['tocar', 'start'],
    category: 'music'
}