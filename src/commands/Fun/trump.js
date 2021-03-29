const { MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch');

module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'trump',
          categoria: '🤣 • Fun',
          desc: 'Faça Trump tweetar algo interresante'
        },
        en: {
          nome: 'trump',
          categoria: '🤣 • Fun',
          desc: 'Make Trump tweet something interesting'
        },
      aliases: [],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`${idioma.image.args.replace("%u", message.author)}`);
        }

        message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
            let json = await res.json();
            let attachment = new MessageAttachment(json.message, "clyde.png");

            message.quote(attachment).then(m2 => {
              m.delete()
            })
        } catch (e) {
            console.log(e.message)
        };
      });
  };
};