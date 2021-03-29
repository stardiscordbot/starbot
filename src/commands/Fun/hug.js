const {MessageEmbed} = require('discord.js');
const superagent = require('superagent');

module.exports = class Command {
  constructor(){
    return {
      permissoes: {
        membro: [], //Permissoes que o usuario necessita
        bot: [], //Permissoes que o bot necessita
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




    if (!message.mentions.users.first()) return message.quote(`:x: ${idioma.hug.user}`);
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/hug");
    
    const embed = new MessageEmbed()
    .setTitle('Star:tm: | Hug')
    .setDescription(`${message.author} ${idioma.hug.acaba} ${message.mentions.users.first()}`)
    .setColor(message.member.displayHexColor)
    .setImage(body.url) 
    
    message.quote(embed)
}
}

