const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    
        client.player.resume(message)
        message.quote(`${emoji.sim} ${message.author}, Retomei a fila`)
    
}

exports.help = {
    name: 'resume',
    aliases: ['retomar', 'retocar'],
    category: 'music'
}