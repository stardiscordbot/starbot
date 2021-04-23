module.exports = class SlapCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'slap',
          categoria: '🤣 • Fun',
          desc: 'Seu amigo corno está te pertubando ? De um tapa na cara dele !!!!'
        },
        en: {
          nome: 'slap',
          categoria: '🤣 • Fun',
          desc: 'Your cuckold friend is disturbing you Slap him in the face !!!!'
        },
      aliases: ['tapa','bater'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      const {MessageEmbed} = require('discord.js');
      const superagent = require('superagent');

    if (!message.mentions.users.first()) return message.quote(`:x: ${message.author} **|** ${idioma.hug.user.replace('hug', 'slap').replace('abraçar', 'bater')}`);

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    
    const embed = new MessageEmbed()
    .setColor("#ff09de")
    .setDescription(`**${message.author.username}** ${idioma.hug.acaba.replace('hugged', 'slapped').replace('abraçar', 'bater')} **${message.mentions.users.first().username}**`)
    .setImage(body.url) 
    message.quote(message.author, embed)
 }
}