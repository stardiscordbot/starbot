const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você me especifique uma musica`)
    const tocando = client.player.isPlaying(message.guild.id);
    
    if(!tocando) { let song = await client.player.play(message.member.voice.channel, args.join(' '));
    song = song.song;
    message.quote(`${emoji.sim} Tocando Agora \`${song.name}.\``);
    }

    if(tocando) {
        let song = client.player.addToQueue(message.guild.id, args.join(" "));
        song = song.song;
        message.quote(`${emoji.sim} Adicionado a fila: \`${song.name}.\``);
    }
}
exports.help = {
    name: 'play',
    aliases: ['tocar', 'start'],
    category: 'music'
}