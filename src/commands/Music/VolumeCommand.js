const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
        if(isNaN(args[0])) return message.quote(`${emoji.nao} ${message.author}, Aparentemente o volume colocado não é um numero valido, tente novamente!`)
        if((args[0]) > 200) return message.quote(`${emoji.nao} ${message.author}, Recomendo você ouvir somente até \`200\` se não você pode ficar surdo!`)
        client.player.setVolume(message.guild.id, args[0]) 
        message.quote(`${emoji.sim} ${message.author}, Volume setado para \`${args[0]}\``)
}

exports.help = {
    name: 'volume',
    aliases: ['vol', 'setvol', 'setvolune'],
    category: 'music'
}