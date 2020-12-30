const Discord = require("discord.js");   
const config = require('../../config.json');
let n = '`';

exports.run = (client, message, args, prefix) => {
  const ajuda = new Discord.MessageEmbed()
  .setTitle('Ajuda | Star:tm:')
  .setDescription(`Olá, ${message.author} meu nome é Star:tm:, bem vindo ao meu ajuda\n\nA Star tem foco em Comandos de diversão, mas também tenho funções de moderação, ultilidades e (em um futuro proximo) economia\n\n**<a:wumpusgift:760827461217812481> | Lista de Comandos**\nhttps://starbot-website.yadg.repl.co/comandos\n**<:wumpus:754739856436887712> | Tem alguma dúvida? Pergunte em meu Suporte!**\nhttps://starbot-website.yadg.repl.co/redirect/suporte`)
  .setColor(config.color)
  .setThumbnail(client.user.displayAvatarURL())
  .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
  message.quote(ajuda).then(msg => {
    msg.react('793905923109683221')

    const ajudafilter = (reaction, user) => reaction.emoji.name === 'star_seta' && user.id === message.author.id;
    const ajuda = msg.createReactionCollector(ajudafilter, { time: 60000 });
    
    const devsize = client.commands.filter(command => command.help.category === "dev").size
    const dev = client.commands.filter(command => command.help.category === "dev").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")
    
    const ecosize = client.commands.filter(command => command.help.category === "economy").size
    const eco = client.commands.filter(command => command.help.category === "economy").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")

    const divsize = client.commands.filter(command => command.help.category === "div").size
    const div = client.commands.filter(command => command.help.category === "div").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")

    const modsize = client.commands.filter(command => command.help.category === "mod").size
    const mod = client.commands.filter(command => command.help.category === "mod").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")

    const othersize = client.commands.filter(command => command.help.category === "others").size
    const other = client.commands.filter(command => command.help.category === "others").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")

    ajuda.on('collect', r1 => {
      r1.users.remove(message.author.id)
      r1.users.remove(client.user.id)
      const discordajuda = new Discord.MessageEmbed()
      .setTitle('Ajuda | Star:tm:')
      .setColor(config.color)
      .setDescription(`${message.author}, já que deseja visualizar meus comandos no discord segue a lista: (lembre-se que o website sempre estará disponível para consultas)`)
      .addField(`Desenvolvedor [${devsize}]`, `${dev}`)
      .addField(`Economia [${ecosize}]`, `${eco}`)
      .addField(`Diversão [${divsize}]`, `${div}`)
      .addField(`Moderação [${modsize}]`, `${mod}`)
      .addField(`Outros [${othersize}]`, `${other}`)
      .setThumbnail(client.user.displayAvatarURL())
      if(message.guild.id == '749990091174445078') {
        const sosize = client.commands.filter(command => command.help.category === "so").size
        const so = client.commands.filter(command => command.help.category === "so").map(e => `\`${prefix}${e.help.name}\``).join(" **|** ")

        const ajudaonly = new Discord.MessageEmbed()
        .setTitle('AjudaOnly | Star:tm:')
        .setDescription(`${message.author}, por estar em meu servidor de suporte existe esse ajuda extra de comandos só executaveis no servidor de suporte`)
        .setColor(config.color)
        .addField(`ServerOnly [${sosize}]`, `${so}`)
        .setThumbnail(client.user.displayAvatarURL())
        message.quote(ajudaonly)
      }
      msg.edit(discordajuda)
    })
  })
}
exports.help = { 
  name: 'ajuda', 
  aliases: ['help', 'comandos', 'commands', 'cmds', 'cmd'],
  status: 'on',
  category: 'others'
}