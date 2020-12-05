const Discord = require('discord.js');
const config = require('../config.json');
const superagent = require('superagent');

exports.run = async (client, message, args) => {

  let erro = new Discord.MessageEmbed()

  .setTitle(`Hug | ${client.user.username}`)
  .setDescription(`*De um carinho naquele seu amigo com o hug!*`)
  .addField(`:hammer: **Uso**`, `\`${config.prefix}hug <@user>\``, true)
  .addField(`:book: **Exemplo**`, `\`${config.prefix}hug @Star™️\``, true)
  .addField(`:bookmark: **Permissao**`, `\`Nenhuma\``)
  .addField(`:twisted_rightwards_arrows: **Alternativas**`, `\`${config.prefix}hug, ${config.prefix}abracar, ${config.prefix}abraco\``)
  .setColor(config.color) 
  .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))

  let avatar = message.author.displayAvatarURL({ dynamic: true, size: 2048 });

    if (!message.mentions.users.first()) return message.quote(erro);
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/hug");
    
    const embed = new Discord.MessageEmbed()
    .setTitle('Star:tm: | Hug')
    .setDescription(`${message.author} acaba de abracar ${message.mentions.users.first()}`)
    .setThumbnail(avatar)
    .setColor(config.color)
    .setImage(body.url) 
    .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.quote(embed)
}
exports.help = {
    name: 'abraço',
    aliases: ['abraçar', 'hug', 'abraco', 'abracar'],
    status: 'on'
}
