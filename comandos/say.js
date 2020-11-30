const Discord = require("discord.js");   
const config = require('../config.json');

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("você nao tem permissão para usar este comando!");
    const sayMessage = args.join(' ');
    if(!args[0]) return message.channel.send(`${message.author} eu não tenho bola de cristal pra adivinhar o que você quer falar, ultilize \`${config.prefix}say <mensagem>\``)
    message.channel.send(`${sayMessage}\n\n- ${message.author}`);
  

}
exports.help = { 
  name: 'say', 
  aliases: ['falar', 'echo'],
  status: 'on'
}