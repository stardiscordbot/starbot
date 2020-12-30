const Discord = require("discord.js");

exports.run = (client, message, args, prefix) => {
    if(message.guild.id !== '749990091174445078') return message.quote(`${message.author}, você sabia que esse comando só pode ser usado no meu servidor de suporte né?`)
    var member = message.member.roles.remove("754113570299445259")
    return message.quote(`<a:sino:787804922376486913> ${message.author} agora você não será mais notificado de todas as minhas novidades!`);
}
exports.help = {
    name: 'desnotificar',
    aliases: ['unotify'],
    category: 'so'
}