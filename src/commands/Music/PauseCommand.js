const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    
        client.player.pause(message)
        message.quote(`${emoji.sim} ${message.author}, Pausei a música \`${musica.name}\``)

}

exports.help = {
    name: 'pause',
    aliases: ['parar'],
    category: 'music'
}