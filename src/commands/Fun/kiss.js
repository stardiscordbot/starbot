const Discord = require('discord.js');
const superagent = require('superagent');
const c = require('../../config.json');

exports.run = async (client, message, args, prefix) => {

  let erro = new Discord.MessageEmbed()

  .setTitle(`INFORMAÇÃO`)
  .setDescription(`*Dê um beijo em alguém*`)
  .addField(`:hammer: **Uso**`, `\`${c.prefix}beijo <@user>\``, true)
  .addField(`:book: **Exemplo**`, `\`${c.prefix}beijo @kayozin\``, true)
  .addField(`:bookmark: **Permissão**`, `\`Nenhuma\``)
  .addField(`:twisted_rightwards_arrows: **Alternativas**`, `\`${c.prefix}beijar\``)
  .setColor('#a67dff')  

    if (!message.mentions.users.first()) return message.quote(erro);
    if (message.mentions.users.first().id === "719524114536333342") return message.quote(`Perdão **${message.author.username}**, já estou comprometida :3`);

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/kiss");
    let avatar = message.author.displayAvatarURL({format: 'png'});
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Beijo")
    .setDescription(`${message.author} acaba de beijar ${message.mentions.users.first()}`)
    .setImage(body.url)
    .setThumbnail(avatar) 
    message.quote({embed})
}
exports.help = {
    name: 'kiss',
    aliases: ['beijar'],
    category: 'div'
}   