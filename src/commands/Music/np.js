const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const { channel } = message.member.voice;

    if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)

    const np = client.player.getQueue(message.guild.id)
    
    const musica = client.player.nowPlaying(message.guild.id)
    if(np == undefined) return message.quote(`${emoji.nao} ${message.author}, Não estou tocando nada, para tocar ultilize: \`${prefix}play <musica>\``)
    
    if(np) {
        let embed = new Discord.MessageEmbed()
        .setTitle(musica.name)
        .addField('Duração:', client.player.createProgressBar(message.guild.id, 20))
        .setColor('ff0000')
        message.quote(embed)
    }
    
}

exports.help = {
    name: 'np',
    aliases: ['tocando', 'nowplayin', 'tocandoagora'],
    category: 'music'
}