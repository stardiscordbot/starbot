const Discord = require("discord.js")
module.exports.run = (client, message, args, prefix) => {
 if (!client.lockit) client.lockit = [];
 if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.qutoe(`<a:nao:753735889783357560> ${message.author}, Você não tem permissão para usar este comando!`); 
 if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.qutoe(`<a:nao:753735889783357560> ${message.author}, Eu não tenho permissão para executar este comando!`); 
 message.channel.createOverwrite(message.guild.id, {
 SEND_MESSAGES: null, reason: `Comando Executado por: ${client.user.tag} (${client.user.id})`
 })
 message.quote(`<a:sim:754692730546028615> ${message.author} desbloqueei este canal, digite \`${prefix}lock\` para bloqueá-lo!`);
// De unlock só trocar no SEND_MESSAGES: false, para SEND_MESSAGES: null
 };
 exports.help = {
    name: 'unlock',
    aliases: ['abrir', 'desbloquear']
}