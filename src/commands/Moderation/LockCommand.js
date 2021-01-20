const Discord = require("discord.js")
exports.run = (client, message, args, prefix) => {
 if (!client.lockit) client.lockit = [];
 if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.qutoe(`<a:nao:753735889783357560> ${message.author}, Você não tem permissão para usar este comando!`); 
 if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.qutoe(`<a:nao:753735889783357560> ${message.author}, Eu não tenho permissão para executar este comando!`); 
message.channel.createOverwrite(message.guild.id, {
 SEND_MESSAGES: false, reason: `Comando Executado por: ${client.user.tag} (${client.user.id}` 
 })
 message.quote(`<a:sim:754692730546028615> ${message.author} bloqueei este canal, digite \`${prefix}lock\` para bloqueá-lo!`);
 };
 exports.help = {
    name: 'lock',
    aliases: ['fechar'],
    category: 'mod'
}