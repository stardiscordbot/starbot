const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const { channel } = message.member.voice;

    if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)
    
    const np = client.player.getQueue(message.guild.id)

    if(np == undefined) return message.quote(`${emoji.nao} ${message.author}, Não estou tocando nada, para tocar ultilize: \`${prefix}play <musica>\``)
    
    if(np) {
        if(isNaN(args[0])) return message.quote(`${emoji.nao} ${message.author}, Aparentemente o volume colocado não é um numero valido, tente novamente!`)
        if((args[0]) > 200) return message.quote(`${emoji.nao} ${message.author}, Recomendo você ouvir somente até \`200\` se não você pode ficar surdo!`)
        client.player.setVolume(message.guild.id, args[0]) 
        message.quote(`${emoji.sim} ${message.author}, Volume setado para \`${args[0]}\``)
    }

}

exports.help = {
    name: 'volume',
    aliases: ['vol', 'setvol', 'setvolune'],
    category: 'music'
}