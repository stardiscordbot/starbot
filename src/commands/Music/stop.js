const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const np = client.player.getQueue(message.guild.id)
    if(np == undefined) return message.quote(`${emoji.nao} ${message.author}, Não estou tocando nada, para tocar ultilize: \`${prefix}play <musica>\``)
    if(np) {
        client.player.stop(message.guild.id)
        message.quote(`${emoji.sim} ${message.author}, Parei de tocar`)
    }
}

exports.help = {
    name: 'stop',
    aliases: ['parar', 'end', 'endqueue'],
    category: 'music'
}