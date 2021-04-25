module.exports = class TrumpCommand {
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
    const fetch = require('node-fetch');
  
    let text = args.join(" ");

        if (!text) {
            return message.quote(`${idioma.image.args.replace("%u", message.author)}`);
        }

        message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
          message.channel.startTyping()
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`));
            let json = await res.json();
            let attachment = new (require("discord.js")).MessageAttachment(json.message, `trump-${message.author.id}.png`);

            message.quote(message.author, attachment).then(m2 => {
              message.channel.stopTyping()
              m.delete()
            })
        } catch (e) {
            console.log(e.message)
        };
      });
  };
};