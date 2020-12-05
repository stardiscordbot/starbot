const Discord = require("discord.js");

exports.run = (client, message, args) => {
    var member = message.member.roles.add("754113570299445259")
    return message.quote(`<a:sino:733637290794156032> ${message.author} agora você será notificado de todas as minhas novidades!`);
}
exports.help = {
    name: 'notificar',
    aliases: ['notify']
}