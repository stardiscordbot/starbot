const Discord = require("discord.js")
module.exports.run = (client, message, args, prefix) => {
 if (!client.lockit) client.lockit = [];
 if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("**Você nao tem permissão para usar este comando!**"); message.channel.createOverwrite(message.guild.id, {
 SEND_MESSAGES: null
 })
 message.quote(`**${message.author} desbloqueei este canal,digite \`lock\` para bloqueá-lo!**`);
// De unlock só trocar no SEND_MESSAGES: false, para SEND_MESSAGES: null
 };
 exports.help = {
    name: 'unlock',
    aliases: ['abrir']
}