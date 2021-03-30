module.exports = class Command {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'kiss',
        categoria: '🤣 • Fun',
        desc: 'Dê um beijo no seu web crush'
      },
      en: {
        nome: 'kiss',
        categoria: '🤣 • Fun',
        desc: 'Kiss your web crush'
      },
    aliases: ['beijar','beijo'],
    run: this.run
  }
}

async run(client, message, args, prefixoCerto, idioma) {
    const {MessageEmbed} = require('discord.js');
    const superagent = require('superagent');

    if (!message.mentions.users.first()) return message.quote(idioma.hug.user.replace('hug', 'kiss').replace('abraçar', 'beijar'));
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/kiss");

    const embed = new MessageEmbed()
    .setColor("#ff09de")
    .setDescription(`**${message.author.username}** ${idioma.hug.acaba.replace('hugged', 'kissed').replace('abraçar', 'beijar')} **${message.mentions.users.first().username}**`)
    .setImage(body.url)
    message.quote(message.author, embed)
 }
}
