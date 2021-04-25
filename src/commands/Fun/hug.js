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
  const fetch = require("node-fetch") 
    if (!message.mentions.users.first()) return message.quote(`:x: ${idioma.hug.user}`);
    const res = await fetch('https://nekos.life/api/v2/img/hug').then(res => res.json())
    .then(json => {
    const embed = new MessageEmbed()
    .setDescription(`**${message.author.username}** ${idioma.hug.acaba} ${idioma.hug.em} **${message.mentions.users.first().username}**`)
    .setColor("#ff09de")
    .setImage(json.url) 
    message.quote(message.author, embed)
  })
}
}

