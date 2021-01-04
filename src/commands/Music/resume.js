const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const { channel } = message.member.voice;

    if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)

    const np = client.player.getQueue(message.guild.id)
    const musica = client.player.nowPlaying(message.guild.id)

    if(np == undefined) return message.quote(`${emoji.nao} ${message.author}, Não estou tocando nada, para tocar ultilize: \`${prefix}play <musica>\``)
    
    if(np) {
        client.player.resume(message.guild.id)
        message.quote(`${emoji.sim} ${message.author}, Retomei a música \`${musica.name}\``)
    }
    
}

exports.help = {
    name: 'resume',
    aliases: ['retomar', 'retocar'],
    category: 'music'
}