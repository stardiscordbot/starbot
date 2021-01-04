const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    
    const { channel } = message.member.voice;

    if(!channel) return message.quote(`${emoji.nao} ${message.author}, Você Precisa estar em um canal de voz para executar este comando`)

    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, Eu preciso que você me especifique uma musica`)
    
    const tocando = client.player.isPlaying(message.guild.id);
    
    if(tocando) {
        let song = await client.player.addToQueue(message.guild.id, args.join(' '));
        song = song.song;
        message.quote(`${emoji.sim} ${message.author}, Adicionado a fila: \`${song.name}.\``);
    } else {
        let song = await client.player.play(message.member.voice.channel, args.join(' '));
        song = song.song;
        message.quote(`${emoji.sim} ${message.author}, Tocando agora: \`${song.name}!\``);
    }

}
exports.help = {
    name: 'play',
    aliases: ['tocar', 'start'],
    category: 'music'
}