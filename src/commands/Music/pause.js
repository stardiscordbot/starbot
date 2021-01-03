const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const np = client.player.getQueue(message.guild.id)
    const musica = client.player.nowPlaying(message.guild.id)
    if(np == undefined) return message.quote(`${emoji.nao} ${message.author}, Não estou tocando nada, para tocar ultilize: \`${prefix}play <musica>\``)
    if(np) {
        client.player.pause(message.guild.id)
        message.quote(`${emoji.sim} ${message.author}, Pausei a música \`${musica.name}\``)
    }
}

exports.help = {
    name: 'pause',
    aliases: ['parar'],
    category: 'music'
}