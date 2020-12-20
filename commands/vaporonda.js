const Discord = require('discord.js')
const emoji = require('../jsons/emojis.json')

exports.run = async (client, message, args, prefix) => {
    if(!args.join(" ")) return message.quote(`${emoji.nao} ${message.author}, eu preciso que você escreva algo após o comando \`${prefix}vaporonda <texto bacana>\``)
    const vaporwavefield = args.join(" ").split(" / ")[0].split('').map(char => {
        const code = char.charCodeAt(0);

        return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char;
    }).join("");
    message.quote(`${emoji.sim} ${message.author}, aqui está seu texto:\n> ${vaporwavefield}`)
}
exports.help = {
    "name": "vaporonda",
    "aliases": ["vaporwave"]
}