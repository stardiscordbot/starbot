const Discord = require('discord.js')
const emoji = require('../../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {

if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, Você precisa selecionar uma opção: \`${prefix}karaoke <on/off>\``)

if(!message.member.voice) return;

if(args[0] == 'on') {

    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, Eu preciso que você me especifique uma musica`)
    
    client.player.setFilters(message, {
        karaoke: true
    });
    message.quote(`<:karaoke:800776130910355506> ${message.author}, Karaoke ativado!`)
}

if(args[0] == 'off') {

    if(!args[0]) return message.quote(`${emoji.nao} ${message.author}, Eu preciso que você me especifique uma musica`)
    
    client.player.setFilters(message, {
        karaoke: false
    });

    message.quote(`<:karaoke:800776130910355506> ${message.author}, Karaoke desativado!`)

}
    
}
exports.help = {
    name: 'karaoke',
    aliases: ['cantar'],
    category: 'music'
}