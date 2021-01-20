const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {

        client.player.stop(message)
        message.quote(`${emoji.sim} ${message.author}, Parei de tocar`)

}

exports.help = {
    name: 'stop',
    aliases: ['parar', 'end', 'endqueue'],
    category: 'music'
}