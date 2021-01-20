require('discord-giveaways')
const Discord = require("discord.js");
const emoji = require('../../jsons/emojis.json')
const ms = require("ms");

module.exports.run = async(client, message, args, prefix) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.qutoe(`<a:nao:753735889783357560> ${message.author}, Você não tem permissão para usar este comando!`); 
    if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.qutoe(`<a:nao:753735889783357560> ${message.author}, Eu não tem permissão para executar este comando!`);
    // Se não tiver nenhum argumento
    if(!args[0]) {
      const error = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} | Giveaways`)
      .setDescription(`Olá, ${message.author} bem vindo ao mundo dos giveaways, para usar os comandos basta seguir os exemplos abaixo:`)
      .addField(`${prefix}giveaway start`, `\`Inicia um sorteio em seu servidor\``)
      .addField(`${prefix}giveaway reroll`, `\`Resorteia os ganhadores de um sorteio\``)
      .addField(`${prefix}giveaway end`, `\`Encerra um sorteio em seu servidor\``)
      .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048}))
      .setColor('ff0000')
      message.quote(error)
    }
    // Comando Start
    if(args[0] == 'start') {
      const starterror = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} | Giveaways`)
      .setDescription(`Olá, ${message.author} bem vindo ao mundo dos giveaways, para iniciar um sorteio siga o exemplo abaixo:\n\n**${prefix}giveaway start <duração> <vencedores> <prêmio>**`)
      .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048}))
      .setColor('ff0000')
      if(!args[1]) return message.quote(starterror)
      if(!args[2]) return message.quote(starterror)
      if(!args[3]) return message.quote(starterror)
      // Iniciando o Sorteio
      client.giveawaysManager.start(message.channel, {
        time: ms(args[1]),
        prize: args.slice(3).join(' '),
        winnerCount: parseInt(args[2])
    }).then((gData) => {
        console.log(gData); // {...} (messageid, end date and more)
    });
}
    // Comando Reroll
    if(args[0] == 'reroll') {
      if(!args[1]) return message.quote(`${emoji.nao} ${message.author}, Eu preciso do id do sorteio`)
      const messageID = args[1];
        client.giveawaysManager.reroll(messageID).then(() => {
            message.quote(`${emoji.sim} ${message.author}, Resorteado com sucesso!`);
        }).catch(() => {
            message.channel.send(`${emoji.nao} ${message.author} Não achei nenhum sorteio com o id \`${message.id}\``);
        });
    }
    // Comando End
    if(args[0] == 'end') {

    }
}
exports.help = {
    name: 'giveaway',
    aliases: ['sorteio'],
    status: 'on',
    category: 'mod'
  }