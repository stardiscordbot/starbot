const Discord = require("discord.js");   
const config = require('../config.json');

exports.run = (client, message, args) => {

    const ajuda = new Discord.MessageEmbed()
    .setTitle('Ajuda | Star:tm:')
    .setDescription(`Olá, ${message.author} meu nome é Star:tm:, bem vindo ao meu ajuda\n\nA Star tem foco em Comandos de diversão, mas também tenho funções de moderação, ultilidades e (em um futuro proximo) economia\n\n**<a:wumpusgift:760827461217812481> | Lista de Comandos**\nhttps://starbot-website.yadg.repl.co/comandos\n**<:wumpus:754739856436887712> | Tem alguma dúvida? Pergunte em meu Suporte!**\nhttps://starbot-website.yadg.repl.co/redirect/suporte`)
    .setColor(config.color)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send(ajuda);

}
exports.help = { 
  name: 'ajuda', 
  aliases: ['help', 'comandos', 'commands', 'cmds'],
  status: 'on'
}