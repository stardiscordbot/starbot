const Discord = require("discord.js");   
const config = require('../../config.json');
let n = '`';

exports.run = (client, message, args, prefix) => {
  if(args[0] === 'discord') {
    // Ajuda
  let divertidos = client.commands.filter(command => command.help.category === "Divertidos").map(e => `${n}${e.help.name}${n}`).join(" **|** ");
  let devs = client.commands.filter(command => command.help.category === "dev").map(e => `${n}${e.help.name}${n}`).join(" **|** ");
    // Size
  let divertidosSize = client.commands.filter(command => command.help.category === "Divertidos").size;
  let devsSize = client.commands.filter(command => command.help.category === "dev").size;
    // Stop
  const discord = new Discord.MessageEmbed()
  .setAuthor(`Ajuda | ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
  .setDescription('**Links:**\n<a:Rosa_seta_pg:754374503001358467> Meu Website: [Clique Aqui](https://starbot-website.yadg.repl.co/)\n<a:Rosa_seta_pg:754374503001358467> Me Adicione: [Clique Aqui](https://discord.com/oauth2/authorize?client_id=719524114536333342&permissions=8&scope=bot)\n<a:Rosa_seta_pg:754374503001358467> Servidor de Suporte: [Clique Aqui](https://discord.gg/2pFH6Yy)')
  .addField(`Diversão [${divertidosSize}]`, `${divertidos}`)
  .addField(`Devs [${devsSize}]`, `${devs}`)
  .setColor(config.color)
  .setThumbnail(client.user.displayAvatarURL())
  .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
  message.quote(discord)
  }

    const ajuda = new Discord.MessageEmbed()
    .setTitle('Ajuda | Star:tm:')
    .setDescription(`Olá, ${message.author} meu nome é Star:tm:, bem vindo ao meu ajuda\n\nA Star tem foco em Comandos de diversão, mas também tenho funções de moderação, ultilidades e (em um futuro proximo) economia\n\n**<a:wumpusgift:760827461217812481> | Lista de Comandos**\nhttps://starbot-website.yadg.repl.co/comandos\n**<:wumpus:754739856436887712> | Tem alguma dúvida? Pergunte em meu Suporte!**\nhttps://starbot-website.yadg.repl.co/redirect/suporte`)
    .setColor(config.color)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.quote(ajuda);
}
exports.help = { 
  name: 'ajuda', 
  aliases: ['help', 'comandos', 'commands', 'cmds'],
  status: 'on',
  category: 'others'
}