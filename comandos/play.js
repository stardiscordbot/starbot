const Discord = require('discord.js')
const pr = require('../mongodb/prefix.js')

exports.run = async (client, message, args, prefix) => {
        // Caso não tenha Musica
    if(!args[0]) message.quote(`${message.author}, eu preciso da musica para tocar, ultilize \`${prefix}play <Musica>\``)
    // Iniciando o player
    let song = await client.player.play(message.member.voice.channel, args[0], {
        duration: 'long'
    });
}
exports.help = {
    name: 'play',
    aliases: ['tocar']
}