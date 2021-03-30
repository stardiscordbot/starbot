module.exports = class Command {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
        dono: false //Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'hug',
        categoria: '🤣 • Fun',
        desc: 'Hug your friend'
      },
      en: {
        nome: 'hug',
        categoria: '🤣 • Fun',
        desc: 'Hug your friend'
      },
    aliases: ['abraço','abraçar'],
    run: this.run
  }
}

async run(client, message, args, prefixoCerto, idioma) {
  const {MessageEmbed} = require('discord.js');
  const superagent = require('superagent');
  
    if (!message.mentions.users.first()) return message.quote(`:x: ${idioma.hug.user}`);
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/hug");
    
    const embed = new MessageEmbed()
    .setDescription(`**${message.author.username}** ${idioma.hug.acaba} **${message.mentions.users.first().username}**`)
    .setColor("#ff09de")
    .setImage(body.url) 
    
    message.quote(message.author, embed)
}
}

