const Discord = require('discord.js')
const emoji = require('../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    const sp = args.join(" ")
    const rand = Math.floor(Math.random() * 6)
    if(!args.join(" ")) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você escreva algo após o comando \`${prefix}ppt <pedra/papel/tesoura>\``)
    if(rand === 0 || rand === 1)  {
        chs = `pedra`
    }

    if(rand === 2 || rand === 3)  {
        chs = `tesoura`
    }

    if(rand === 4 || rand === 5 )  {
        chs = `papel`
    }

    if(sp == `papel` && chs == `papel` || sp == `pedra` && chs == `pedra` || sp == 'tesoura' && chs == 'tesoura') {
        message.quote(`${emoji.bot} Você escolheu **${sp}** e eu escolhi **${chs}**`)
    }

    if(sp == `papel` && chs == `pedra` || sp == `pedra` && chs == `tesoura` || sp == `tesoura` && chs == `papel`){
        message.quote(`${emoji.sim} ${message.author}, Você escolheu **${sp}** e eu escolhi **${chs}**`)
    }

    if(sp == `papel` && chs == `tesoura` || sp == `pedra` && chs == `papel` || sp == `tesoura` && chs == `pedra`){
        message.quote(`${emoji.nao} ${message.author}, Você escolheu **${sp}** e eu escolhi **${chs}**`)
    }
}
exports.help = {
    "name": "ppt",
    "aliases": ["jokempo"]
}